import factions from './data/factions.json'
import recruits from './data/recruits.json'
import skills from './data/skills.json'
import armors from './data/armors.json'
import weapons from './data/weapons.json'
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
  if (!member.notes) {
    member.notes = ""
  }
}

let validateSkill = (skill) => {
  if (!skill.effects) {
    var effects = JSON.parse(JSON.stringify(skills.find(s => s.id == skill.id).effects))
    skill.effects = effects
  }
}

export var crewValidator = { validateModel }