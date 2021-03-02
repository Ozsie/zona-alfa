import skills from './data/skills.json'
import equipment from './data/equipment.json'

let validateModel = (crew) => {
  crew.members.forEach(validateMember)

  if (!crew.notes) {
    crew.notes = ""
  }
  if (!crew.artifacts) {
    crew.artifacts = ""
  }

  return crew
}

let validateMember = (member) => {
  member.skills.forEach(validateSkill)
  member.weapons.forEach(w => validateWeapon(w, member))
  member.equipment.forEach(e => validateEquipment(e))
  if (!member.notes) {
    member.notes = ""
  }
}

let validateEquipment = (quip) => {
  if (!quip.effects) {
    quip.effects = JSON.parse(JSON.stringify(equipment.find(e => e.id === quip.id).effects))
  }
}

let validateSkill = (skill) => {
  if (!skill.effects) {
    skill.effects = JSON.parse(JSON.stringify(skills.find(s => s.id === skill.id).effects))
  }
}

let validateWeapon = (weapon, member) => {
  if (weapon.damage.template === "Small Blast") {
    weapon.damage.template = "SBT"
  }
  if (weapon.damage.template === "Large Blast") {
    weapon.damage.template = "LBT"
  }
  if (!weapon.option) {
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

export var crewValidator = { validateModel }