import skills from './data/skills.json'
import equipment from './data/equipment.json'
import recruits from './data/recruits.json'
import {crewBuilder} from './crewBuilder'

let validateModel = (crew) => {
  console.log("validating crew")
  crew.members.forEach(validateMember)

  if (!crew.notes) {
    console.log(" adding notes")
    crew.notes = ""
  }
  if (!crew.artifacts) {
    console.log(" adding artifacts")
    crew.artifacts = ""
  }
  if (!crew.options) {
    console.log(" adding options")
    crew.options = {}
  }
  if (!crew.options.startingEquipment) {
    console.log(" adding starting equipment")
    crew.options.startingEquipment = crew.faction.startingEquipment
  }

  console.log(" old K      =>", crew.k)
  crew = crewBuilder.updateK(crew)
  console.log(" updated K  =>", crew.k)
  console.log("validation done")
  return crew
}

let validateStat = (stat, member, crew) => {
  let def = recruits.find(r => r.id === member.id)[stat]
  if (member[stat] < 1) {
    member[stat] = 1
  } else if (member[stat] > def + 2 && !member.leader) {
    member[stat] = def + 2
  }
  return crew
}

let validateMember = (member) => {
  console.log(" validating member", member.name)
  member.skills.forEach(validateSkill)
  member.weapons.forEach(w => validateWeapon(w, member))
  member.equipment.forEach(e => validateEquipment(e))
  if (!member.notes) {
    console.log("  adding notes")
    member.notes = ""
  }
  console.log("  setting leader")
  member.leader = !!member.skills.find(s => s.id === 5);
  console.log("  setting experience")
  switch (member.cost) {
    case 0:
    case 1:
      member.experience = "Rookie"
      break
    case 2:
      member.experience = "Hardened"
      break
    case 3:
    default:
      member.experience = "Veteran"
  }
  return member
}

let validateEquipment = (quip) => {
  if (!quip.effects) {
    quip.effects = JSON.parse(JSON.stringify(equipment.find(e => e.id === quip.id).effects))
  }
}

let validateSkill = (skill) => {
  console.log("  validating skill")
  if (!skill.effects) {
    console.log("   adding effects")
    skill.effects = JSON.parse(JSON.stringify(skills.find(s => s.id === skill.id).effects))
  }
}

let validateWeapon = (weapon, member) => {
  console.log("  validating skill")
  if (weapon.damage.template === "Small Blast") {
    console.log("   fixing SBT name")
    weapon.damage.template = "SBT"
  }
  if (weapon.damage.template === "Large Blast") {
    console.log("   fixing LBT name")
    weapon.damage.template = "LBT"
  }
  if (!weapon.option) {
    console.log("   fixing weapon option")
    if (weapon.category === "grenade") {
      weapon.option = "grenade"
    } else if (weapon.category !== "melee") {
      weapon.option = "rangedWeapon"
    } else {
      var otherWeapons = member.weapons
          .filter(w => w !== weapon)
          .filter(w => w.category !== "grenade")
          .filter(w => w.category === "melee")
          .filter(w => w.option)
      if (otherWeapons.length > 0) {
        weapon.option = "meleeWeapon"
      } else {
        weapon.option = "rangedWeapon"
      }
    }
  }
}

export var crewValidator = {validateModel, validateStat, validateMember}