import factions from './data/factions.json'
import recruits from './data/recruits.json'
import skills from './data/skills.json'
import armors from './data/armors.json'
import weapons from './data/weapons.json'
import equipment from './data/equipment.json'

let create = (name, factionId) => {
  var faction = createFaction(factionId)
  var leader = createLeader(faction.name)
  var crew = {
    "id": createUUID(),
    "name": name,
    "faction": faction,
    "k": 3,
    "members": [leader],
    "notes": ""
  }
  return crew
}

let updateK = (crew) => {
  var base = crew.members.map(m => m.cost).reduce((accumulator, currentValue) => accumulator + currentValue)
  var upgrades = crew.members.map(m => {
    var template = findRecruit(m.id)
    var moveDiff = m.movement - template.movement
    var caDiff = m.combatAbility - template.combatAbility
    var willDiff = m.will - template.will
    return moveDiff + caDiff + willDiff
  }).reduce((accumulator, currentValue) => accumulator + currentValue)
  crew.k = base + upgrades
  return crew
}

let addRecruit = (recruitId, crew) => {
  var recruit = createMember(recruitId, crew.faction.name)

  crew.members.push(recruit)
  return updateK(crew)
}

let addWeapon = (weaponId, weaponOption, member, crew) => {
  var weapon = JSON.parse(JSON.stringify(findWeapon(weaponId)))
  weapon.name = weapon.types.join(" / ")
  weapon.option = weaponOption
  member.weapons = [...member.weapons, weapon]
  member.options[weaponOption]--
  return crew
}

let removeWeapon = (weapon, member, crew) => {
  var index = member.weapons.findIndex(w => w == weapon)
  member.weapons.splice(index, 1)
  member.options[weapon.option]++
  return crew
}

let addSkill = (skillId, member, crew) => {
  var skill = JSON.parse(JSON.stringify(findSkill(skillId)))
  member.skills = [...member.skills, skill]
  member.options.skill--
  return crew
}

let removeSkill = (skill, member, crew) => {
  if (skill.name != "Leader") {
    var index = member.skills.findIndex(s => s == skill)
    member.skills.splice(index, 1)
    member.options.skill++
  }
  return crew
}

let addBasicEquipment = (equipmentId, member, crew) => {
  var equipment = JSON.parse(JSON.stringify(findEquipment(equipmentId)))
  member.equipment = [...member.equipment, equipment]
  member.options.basicEquipment--
  return crew
}

let removeEquipment = (equipment, member, crew) => {
  if (!equipment.armor) {
    var index = member.equipment.findIndex(e => e == equipment)
    member.equipment.splice(index, 1)
    member.options.basicEquipment++
  }
  return crew
}

let changeFaction = (factionId, crew) => {
  var faction = createFaction(factionId)
  crew.faction = faction
  return crew
}

let hasSkill = (skillId, member) => {
  return !!member.skills.find(skill => skill.id == skillId)
}

let hasEquipment = (equipmentId, member) => {
  return !!member.equipment.find(equipment => equipment.id == equipmentId)
}

let createFaction = (factionId) => {
  var faction = JSON.parse(JSON.stringify(findFaction(factionId)))
  var allies = faction.allies.map(id => findFactionName(id))
  var enemies = faction.enemies.map(id => findFactionName(id))
  var starters = JSON.parse(JSON.stringify(faction.startingEquipment.map(id => findEquipment(id))))
  faction.allies = allies
  faction.enemies = enemies
  faction.startingEquipment = starters
  return faction
}

let createLeader = (factionName) => {
  var leader = JSON.parse(JSON.stringify(createMember(3, factionName)))
  var leaderSkill = JSON.parse(JSON.stringify(findSkill(5)))
  leader.skills.push(leaderSkill)

  return leader
}

let createMember = (recruitId, factionName) => {
  var member = JSON.parse(JSON.stringify(findRecruit(recruitId)))
  var armor = findArmor(member.armor)
  member.name = ""
  member.armor = armor.armor
  member.equipment = [armor]
  member.faction = factionName
  member.weapons = []
  member.skills = []
  member.notes = ""

  return member
}

let findSkill = (skillId) => {
    return skills.find(skill => skill.id == skillId)
}

let findRecruit = (recruitId) => {
    return recruits.find(recruit => recruit.id == recruitId)
}

let findArmor = (armorId) => {
    return armors.find(armor => armor.id == armorId)
}

let findWeapon = (weaponId) => {
  return weapons.find(weapon => weapon.id == weaponId)
}

let findFaction = (factionId) => {
  return factions.find(faction => faction.id == factionId)
}

let findEquipment = (equipmentId) => {
  return equipment.find(e => e.id == equipmentId)
}

let findFactionName = (factionId) => {
  return findFaction(factionId).name
}

let createUUID = () => {
  var dt = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    var r = (dt + Math.random()*16)%16 | 0;
    dt = Math.floor(dt/16);
    return (c=='x' ? r :(r&0x3|0x8)).toString(16);
  });
  return uuid;
}

export var crewBuilder = { create, addRecruit, updateK, addSkill, addBasicEquipment, addWeapon, removeSkill, removeEquipment, removeWeapon, changeFaction, hasSkill, hasEquipment }