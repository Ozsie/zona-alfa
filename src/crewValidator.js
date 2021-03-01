import factions from './data/factions.json'
import recruits from './data/recruits.json'
import skills from './data/skills.json'
import armors from './data/armors.json'
import weapons from './data/weapons.json'
import equipment from './data/equipment.json'

let validateModel = (crew) => {
  crew.members.forEach(member => {
    member.skills.forEach(skill => {
      if (!skill.effects) {
        var effects = JSON.parse(JSON.stringify(skills.find(s => s.id == skill.id).effects))
        skill.effects = effects
      }
    })
  })

  return crew
}

export var crewValidator = { validateModel }