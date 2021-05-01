const initialState = {
    risks:{
        // 'riskId':{
        //     data:[{id:'',type:'rec',questionId:''}],
        //     creation:{questionId:'',slected:''},
        //     exp:'',
        //     prob:'',
        //     primary:'',
        //     suggest:[{id:'',type:'rec',questionId:''}]
        // },
    },
}


export default (state = initialState, action) => {



    switch(action.type) {
        case 'ADD_RISK_ANSWER':
            var actualState = {...state}

            actualState.position = {...actualState.position, itemId:action.payload.itemId,groupId:action.payload.groupId,peek:action.payload.peek}

            if (action.payload.peekData?.risk) {
                var dataRisk = []
                action.payload.peekData.risk.map(i=>{
                    dataRisk.push({id:i,choosen:false})
                })
                actualState.risks[`${action.payload.groupId}-${action.payload.itemId}`] = {
                    data:[...dataRisk],
                    peek:action.payload.peek
                }
            } else {
                actualState.risks[`${action.payload.groupId}-${action.payload.itemId}`] = {
                    data:[],
                    peek:action.payload.peek
                }
            }
           
            console.log(actualState);

        return {...actualState};

        case 'CHOOSE_RISK_ANSWER':
            console.log('log',action.payload)
            var actualState = {...state}
            var data = {questionId:action.payload.answer.questionId,selected:action.payload.answer.selected}
            var validate = actualState.risks[action.payload.item.risk]
            var actualStateRisk = validate ? {...validate,created:validate.created?[...validate.created,data]:[data],...action.payload.data} : {created:[data],data:[],suggest:[],...action.payload.data};
            ['rec','med','font'].map((item)=>{
                if (action.payload.item[item]) {
                    action.payload.item[item].map(itemId=>{
                       if (actualStateRisk.data.findIndex(i=>i.id==itemId) == -1) actualStateRisk.data.push({
                           id:itemId,
                           type:item,
                           questionId:action.payload.answer.questionId,
                           selected:action.payload.answer.selected,
                        })
                    })
                }
            });
            ['rec','med','font'].map((item)=>{
                if (action.payload.item[`${item}Sug`]) {
                    action.payload.item[`${item}Sug`].map(itemId=>{
                       if (actualStateRisk.suggest.findIndex(i=>i.id==itemId) == -1) actualStateRisk.suggest.push({
                           id:itemId,
                           type:item,
                           questionId:action.payload.answer.questionId,
                           selected:action.payload.answer.selected,
                        })
                    })
                }
            });
            
            actualState.risks[action.payload.item.risk] = {...actualStateRisk}
        
            console.log('actualState.risks',actualState.risks);
            console.log('data',action.payload.data);
            console.log('action.payload.answer',action.payload.answer);

        return {...actualState};

        case 'CHOOSE_MULT_RISK_ANSWER':
            var actualState = {...state}
            console.log('Payloas',action.payload)
            action.payload.map(actionPayload=>{
                var data = {questionId:actionPayload.answer.questionId,selected:actionPayload.answer.selected}
                var validate = actualState.risks[actionPayload.item.risk]
                var actualStateRisk = validate ? {...validate,created:validate.created?[...validate.created,data]:[data],...actionPayload.data} : {created:[data],data:[],suggest:[],...actionPayload.data};
                ['rec','med','font'].map((item)=>{
                    if (actionPayload.item[item]) {
                        actionPayload.item[item].map(itemId=>{
                           if (actualStateRisk.data.findIndex(i=>i.id==itemId) == -1) actualStateRisk.data.push({
                               id:itemId,
                               type:item,
                               questionId:actionPayload.answer.questionId,
                               selected:actionPayload.answer.selected,
                            })
                        })
                    }
                });
                ['rec','med','font'].map((item)=>{
                    if (actionPayload.item[`${item}Sug`]) {
                        actionPayload.item[`${item}Sug`].map(itemId=>{
                           if (actualStateRisk.suggest.findIndex(i=>i.id==itemId) == -1) actualStateRisk.suggest.push({
                               id:itemId,
                               type:item,
                               questionId:actionPayload.answer.questionId,
                               selected:actionPayload.answer.selected,
                            })
                        })
                    }
                });
                
                actualState.risks[actionPayload.item.risk] = {...actualStateRisk}
            })
            //delete actualState['await']
        return {...actualState};

        case 'REMOVE_RISK_ANSWER':
            var actualState = {...state}

            action.payload.risksId.map(riskId=>{
                if (actualState.risks[riskId]) {

                    var actualStateRisk = {...actualState.risks[riskId]}
                    actualStateRisk.data = actualStateRisk.data ? [...actualStateRisk.data.filter(i=>i.questionId != action.payload.questionId)] : []
                    actualStateRisk.suggest = actualStateRisk.suggest ? [...actualStateRisk.suggest.filter(i=>i.questionId != action.payload.questionId)] : []
                    actualStateRisk.created = [...actualState.risks[riskId].created.filter(i=>i.questionId != action.payload.questionId)]

                    if (action.payload.parentId) {
                        actualStateRisk.data = actualStateRisk.data ? [...actualStateRisk.data.filter(i=>i.questionId != action.payload.parentId)] : []
                        actualStateRisk.suggest = actualStateRisk.suggest ? [...actualStateRisk.suggest.filter(i=>i.questionId != action.payload.parentId)] : []
                        actualStateRisk.created = [...actualState.risks[riskId].created.filter(i=>i.questionId != action.payload.parentId)]
                    }

                    if (actualStateRisk.created.length == 0) {
                        delete actualState.risks[riskId]
                    } else {
                        actualState.risks[riskId]={...actualStateRisk}
                    }
                    
                }
            })

            // console.log('action.payload',action.payload)
            // var riskId = action.payload.risk
            // var rec = action.payload.rec
            // var med = action.payload.med
            // var font = action.payload.font
            // var recSug = action.payload.recSug
            // var medSug = action.payload.medSug
            // var fontSug = action.payload.fontSug

            // var actualStateRisk = actualState.risks[action.payload.risk]

            // if (actualStateRisk) {

            // }

            // if (action.payload.rec) {
            //     action.payload.rec.map(recId=>{
            //        if (actualStateRisk.findIndex(i=>i.id==recId) == -1) actualStateRisk.push({id:recId,type:'rec'})
            //     })
            // }
            // actualState.risks[action.payload.risk] = [...actualStateRisk]
        
            // console.log(actualState.risks);

        return {...actualState};

        case 'CHOOSE_RISK_ANSWER_DATA':
            var actualState = {...state}
            actualStateRisk = {...actualState.risks[action.payload.riskId]}
            actualStateRisk.data = [...actualStateRisk.data,...actualStateRisk.suggest.filter(i=>i.id == action.payload.dataId)]
            actualStateRisk.suggest = [...actualStateRisk.suggest.filter(i=>i.id != action.payload.dataId)]
            actualState.risks[action.payload.riskId] = {...actualStateRisk}
        return {...actualState};

        case 'REMOVE_RISK_ANSWER_DATA':
            var actualState = {...state}
            actualStateRisk = {...actualState.risks[action.payload.riskId]}
            actualStateRisk.suggest = [...actualStateRisk.suggest,...actualStateRisk.data.filter(i=>i.id == action.payload.dataId)]
            actualStateRisk.data = [...actualStateRisk.data.filter(i=>i.id != action.payload.dataId)]
            actualState.risks[action.payload.riskId] = {...actualStateRisk}
        return {...actualState};

        // case 'ADD_RISK_ANSWER_POSITION':
        //     var actualState = {...state}
        //     actualState.position = {...action.payload}
        //     if (action.payload?.peek && action.payload.action[action.payload.peek]?.child && !action.payload.action[action.payload.peek]?.parent) actualState.parent = [action.payload.id]
        //     if (action.payload?.peek && action.payload.action[action.payload.peek]?.child && action.payload.action[action.payload.peek].parent) actualState.parent = [...actualState.parent.filter(i=>i!=action.payload.id),action.payload.id]
        // return {...actualState};

        case 'LOGOUT_RISK_ANSWER':
            return {...initialState};

        default:
        return state;
    }
}



/*             action.payload?.data && action.payload.data.map((group)=>{
                let GROUP = {id:item.id, response:[]}
                group?.questions && group.questions.map((question)=>{
                    GROUP.push({})
                })
            }) */
