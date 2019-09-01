class Drugs{
    foo(agent) {
        const drugs=agent.parameters['drugs']
     const gotDrugs=drugs.length>0
     if(!gotDrugs){
     agent.add('are there any pills or mediaction you take regularly?')}
    }
}
module.exports=Drugs