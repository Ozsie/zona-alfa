import factions from './data/factions.json'
import recruits from './data/recruits.json'
import skills from './data/skills.json'
import armors from './data/armors.json'
import weapons from './data/weapons.json'
import equipment from './data/equipment.json'

let create = (name, factionId) => {
  let faction = createFaction(factionId);
  let leader = createLeader(faction.name);
  return {
    "id": createUUID(),
    "name": name,
    "faction": faction,
    "k": 3,
    "members": [leader],
    "notes": "",
    "options": {
      "startingEquipment": faction.startingEquipment
    }
  }
}

let updateK = (crew, debug) => {
  if (debug) {
    console.log("Updating K")
    console.log(" current:         ", crew.k)
    console.log(" new:")
  }
  let crewCost = crew.members.map(m => m.cost)
  let base = crewCost.reduce((accumulator, currentValue) => accumulator + currentValue);
  let upgrades = crew.members.map(m => {
    let template = findRecruit(m.id);
    let moveDiff = m.movement - template.movement;
    if (m.weapons.filter(w => w.category === "support").length !== 0) {
      moveDiff = (m.movement + 1) - template.movement;
    }
    let caDiff = m.combatAbility - template.combatAbility;
    let willDiff = m.will - template.will;
    if (debug) {
      console.log("  member " + m.name + ": ", m.experience)
      console.log("   cost          = " + m.cost)
      console.log("   move          = " + moveDiff)
      console.log("   combatAbility = " + caDiff)
      console.log("   will          = " + willDiff)
    }
    return moveDiff + caDiff + willDiff
  }).reduce((accumulator, currentValue) => accumulator + currentValue);
  crew.k = base + upgrades
  if (debug) {
    console.log("  base:           ", base)
    console.log("  upgrades:       ", upgrades)
    console.log(" new:             ", crew.k)
  }
  return crew
}

let addRecruit = (recruitId, crew, debug) => {
  let recruit = createMember(recruitId, crew.faction.name);

  crew.members.push(recruit)
  return updateK(crew, debug)
}

let removeMember = (member, crew, debug) => {
  let index = crew.members.findIndex(m => m === member);
  crew.members.splice(index, 1)
  return updateK(crew, debug)
}

let addWeapon = (weaponId, weaponOption, member, crew) => {
  let weapon = JSON.parse(JSON.stringify(findWeapon(weaponId)));
  weapon.name = weapon.types.join(" / ")
  weapon.option = weaponOption
  member.weapons = [...member.weapons, weapon]
  member.options[weaponOption]--
  if (weapon.category === 'support') {
    member.movement = member.movement > 1 ? member.movement - 1 : 1
  }
  return crew
}

let removeWeapon = (weapon, member, crew) => {
  let index = member.weapons.findIndex(w => w === weapon);
  member.weapons.splice(index, 1)
  member.options[weapon.option]++
  if (weapon.category === 'support') {
    member.movement = member.movement + 1
  }
  return crew
}

let addSkill = (skillId, member, crew) => {
  let skill = JSON.parse(JSON.stringify(findSkill(skillId)));
  member.skills = [...member.skills, skill]
  member.options.skill--
  if (skill.name === "Leader") {
    member.wounds++
    member.leader = true
  }
  return crew
}

let removeSkill = (skill, member, crew) => {
  let index = member.skills.findIndex(s => s === skill);
  member.skills.splice(index, 1)
  member.options.skill++
  if (skill.name === "Leader") {
    member.wounds--
    member.leader = false
  }
  return crew
}

let addStartingEquipment = (equipmentId, member, crew) => {
  let equipment = crew.options.startingEquipment.find((item) => item.id === equipmentId)
  member.startingEquipment = [...member.startingEquipment, equipment]
  const index = crew.options.startingEquipment.indexOf(equipment)
  crew.options.startingEquipment.splice(index, 1)
  return crew
}

let removeStartingEquipment = (equipment, member, crew) => {
  let index = member.startingEquipment.findIndex(e => e === equipment);
  member.startingEquipment.splice(index, 1)
  crew.options.startingEquipment.push(equipment)
  console.log(crew)
  return crew
}

let addBasicEquipment = (equipmentId, member, crew) => {
  let equipment = JSON.parse(JSON.stringify(findEquipment(equipmentId)));
  member.equipment = [...member.equipment, equipment]
  member.options.basicEquipment--
  return crew
}

let addArmor = (armorId, member, crew) => {
  let armor = JSON.parse(JSON.stringify(findArmor(armorId)));
  member.equipment = [...member.equipment, armor]
  member.options.armor = 0
  member.armor = armor.armor
  return crew
}

let removeEquipment = (equipment, member, crew) => {
  let isArmor = equipment.armor !== undefined
  let index = member.equipment.findIndex(e => e === equipment);
  member.equipment.splice(index, 1)
  if (isArmor) {
    member.options.armor = 1
  } else {
    member.options.basicEquipment++
  }
  return crew
}

let removePhoto = (member, crew) => {
  member.photo = ""
  return crew
}

let changeFaction = (factionId, crew) => {
  crew.faction = createFaction(factionId)
  crew.options.startingEquipment = crew.faction.startingEquipment
  crew.members.forEach((member) => member.startingEquipment = [])
  return crew
}

let hasSkill = (skillId, member) => {
  return !!member.skills.find(skill => skill.id === skillId)
}

let hasEquipment = (equipmentId, member) => {
  return !!member.equipment.find(equipment => equipment.id === equipmentId)
}

let createFaction = (factionId) => {
  let faction = JSON.parse(JSON.stringify(findFaction(factionId)));
  let allies = faction.allies.map(id => findFactionName(id));
  let enemies = faction.enemies.map(id => findFactionName(id));
  let starters = JSON.parse(JSON.stringify(faction.startingEquipment.map(id => findEquipment(id))));
  faction.allies = allies
  faction.enemies = enemies
  faction.startingEquipment = starters
  return faction
}

let createLeader = (factionName) => {
  let leader = JSON.parse(JSON.stringify(createMember(3, factionName)));
  let leaderSkill = JSON.parse(JSON.stringify(findSkill(5)));
  leader.skills.push(leaderSkill)

  return leader
}

let createMember = (recruitId, factionName) => {
  let member = JSON.parse(JSON.stringify(findRecruit(recruitId)));
  let armor = findArmor(member.armor);
  member.experience = member.name
  member.name = ""
  member.armor = armor.armor
  member.equipment = [armor]
  member.faction = factionName
  member.weapons = []
  member.skills = []
  member.notes = ""
  member.startingEquipment = []

  return member
}

let findSkill = (skillId) => {
  return skills.find(skill => skill.id === skillId)
}

let findRecruit = (recruitId) => {
  return recruits.find(recruit => recruit.id === recruitId)
}

let findArmor = (armorId) => {
  return armors.find(armor => armor.id === armorId)
}

let findWeapon = (weaponId) => {
  return weapons.find(weapon => weapon.id === weaponId)
}

let findFaction = (factionId) => {
  return factions.find(faction => faction.id === factionId)
}

let findEquipment = (equipmentId) => {
  return equipment.find(e => e.id === equipmentId)
}

let findFactionName = (factionId) => {
  return findFaction(factionId).name
}

let createUUID = () => {
  let dt = new Date().getTime();
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    let r = (dt + Math.random() * 16) % 16 | 0;
    dt = Math.floor(dt / 16);
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
}

export var crewBuilder = {
  create,
  addRecruit,
  addSkill,
  addStartingEquipment,
  addBasicEquipment,
  addWeapon,
  addArmor,
  removePhoto,
  removeMember,
  removeSkill,
  removeEquipment,
  removeStartingEquipment,
  removeWeapon,
  updateK,
  changeFaction,
  hasSkill,
  hasEquipment
}