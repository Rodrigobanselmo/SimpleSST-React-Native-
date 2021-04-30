/* eslint-disable no-unused-vars */
import React, {useContext} from 'react';
import {ThemeContext} from "styled-components";
import {Dimensions,View, } from 'react-native';
import {useReactModal} from '../../../context/ModalContext'
import styled,{css} from "styled-components/native";
import {ButtonInitial,IconButton} from '../../../components/basicComponents/Button';
import Icons from '../../../components/Icons'
import {Ascendent} from '../../../helpers/Sort'
import * as Animatable from 'react-native-animatable';
import { useSelector } from 'react-redux';

import { TouchableOpacity,TextInput,FlatList,ScrollView } from 'react-native-gesture-handler';

const TextQuestion = styled(Animatable.Text)`
  text-align:center;
  font-size:16px;

  ${props => props.windowHeight <700 && css`
    line-height:20px;
  `}
  ${props => props.windowHeight >700 && css`
    line-height:22px;
    font-size:18px;
  `}
  ${props => props.windowHeight >800 && css`
    line-height:26px;
    font-size:20px;
  `}
`;

const ViewTextContent = styled.View`
/*   background-color: ${({theme})=>theme.background.lineActive}; */
  background-color: ${({theme})=>theme.background.paper};
  padding:20px;
  margin:15px 15px;
  border-radius:10px;


  ${props => props.windowHeight <700 && css`
  `}
  ${props => props.windowHeight >700 && css`
    flex:1;
    justify-content:center;
  `}
  ${props => props.windowHeight >800 && css`
  `}
`;

const TextGroup = styled.Text`
  width:75%;
  color: ${({theme})=>theme.text.third};
  font-size:15px;
`;

const TextProgress = styled.Text`
  width:auto;
  color: ${({theme})=>theme.text.third};
  ${props => props.windowHeight >700 && css`
    font-size:16px;
  `}
  ${props => props.windowHeight >800 && css`
    font-size:17px;
  `}
`;


export function CardCheckList({item,group,groupId,onAnimatedFlip,index,data,dispatch,model,answer,sheetRef}) {

  const windowHeight = Dimensions.get('window').height
  const themeContext = useContext(ThemeContext);
  const reactModal = useReactModal();
  const risk = useSelector(state => state.risk);
  const riskAnswer = useSelector(state => state.riskAnswer);
  const answers = useSelector(state => state.answer);
  
  function onAnswer(peek,selected) {
    //console.log(item.action[peek])
    console.log('riskAnswer',riskAnswer.risks)
    

    function onGoBack() {
      if (peek === 'goBack') {
        dispatch({type: 'CHECKLIST_BACK',payload:{itemId:item.id,groupId,parentId:item.parent}})
        dispatch({type: 'ANSWER_CLEAN_PARENT',payload:{parentId:item.parent,groupId,itemId:item.id}})
      }
    }

    // if (item.action[peek]) {
      // console.log(21)
      // if (item.action[peek]?.data && item.action[peek].data.length > 0 && !(item.action[peek].data.length == 1 && item.action[peek].data[0].man)) { //se existe dados a adicionar e is not man
        
      //   if (answers.findIndex(i=>i.questionId==item.id) == -1) { // nenhuma respondida
      //     sheetRef.current.snapTo(1)
      //     console.log('primeira vez respondendo')
      //   } else if (!(answers[answers.findIndex(i=>i.questionId==item.id)] && answers[answers.findIndex(i=>i.questionId==item.id)].selected == peek)) { // se nao for mesma resposta
      //     sheetRef.current.snapTo(1)
      //     console.log('trocando resposta')
      //   } else if (answers[answers.findIndex(i=>i.questionId==item.id)] && answers[answers.findIndex(i=>i.questionId==item.id)].selected == peek) { //se for mesma resposta
      //     console.log('retirando resposta')
      //   }

      //   dispatch({type: 'ADD_RISK_ANSWER_POSITION',payload:{...item}})
      // } else if (item.action[peek].data.length == 1 && item.action[peek].data[0].man) { // if question is man

      //   if (answers.findIndex(i=>i.questionId==item.id) == -1) { // nenhuma respondida
      //     sheetRef.current.snapTo(1)
      //     console.log('primeira vez respondendo')
      //   } else if (!(answers[answers.findIndex(i=>i.questionId==item.id)] && answers[answers.findIndex(i=>i.questionId==item.id)].selected == peek)) { // se nao for mesma resposta
      //     sheetRef.current.snapTo(1)
      //     console.log('trocando resposta')
      //   } else if (answers[answers.findIndex(i=>i.questionId==item.id)] && answers[answers.findIndex(i=>i.questionId==item.id)].selected == peek) { //se for mesma resposta
      //     console.log('retirando resposta')
      //   }

      //   dispatch({type: 'ADD_RISK_ANSWER_POSITION',payload:{...item}})
      // }

      function onChild() {
        if (item.action[peek]?.child) {
          dispatch({type: 'CHECKLIST_CHILD',payload:{peek,itemId:item.id,groupId,childId:item.action[peek].child}})
        }
      }

      function openSheet() {
        if (item.action[peek]?.data && item.action[peek].data.length > 0 && !(item.action[peek].data.length == 1 && item.action[peek].data[0].man)) {
          sheetRef.current.snapTo(1)
        }
      }

      function removeAnswer(type) {

        function onConfirm() {
          const riskIds = []
          Object.keys(riskAnswer.risks).map(key=>{
            console.log(riskAnswer.risks[key])
            if ( riskAnswer.risks[key].created.questionId == item.id || (Array.isArray(riskAnswer.risks[key].data) && riskAnswer.risks[key].data.filter(it=>it.questionId == item.id).length > 0)) riskIds.push(key)
          })
          console.log('riskIds',riskIds)
          dispatch({type: 'ADD_RISK_ANSWER_POSITION',payload:{...item}})
          dispatch({type: 'ANSWER',payload:{peek,itemId:item.id,groupId}})
          dispatch({type: 'REMOVE_RISK_ANSWER',payload:{risksId:[...riskIds],questionId:item.id}})
          if (type.includes('openSheet')) openSheet()
          if (type.includes('onChild')) onChild()
        }

        reactModal.alert({
          title:'Remover Pergunta',
          text:`Você tem certeza que deseza mudar sua resposta, isso irá causar a perda dos dados adicionados á ela?`,
          confirmButton:'Mudar',
          warn:true,
          option:true,
          onConfirm:onConfirm,
        })
      }

      function removeGoBack() {

        function onConfirm() {
          onGoBack()
        }

        reactModal.alert({
          title:'Remover Pergunta',
          text:`Você tem certeza que deseza mudar sua resposta, isso irá causar a perda dos dados adicionados á ela?`,
          confirmButton:'Mudar',
          warn:true,
          option:true,
          onConfirm:onConfirm,
        })
      }

      const answerIndex = answers.findIndex(i=>i.questionId==item.id) 

      if (peek === 'goBack') { 
        if (answerIndex == -1) onGoBack()
        else removeGoBack()

      } else if (answerIndex == -1) { // nenhuma respondida
        dispatch({type: 'ADD_RISK_ANSWER_POSITION',payload:{...item}})
        dispatch({type: 'ANSWER',payload:{peek,itemId:item.id,groupId}})
        openSheet()
        onChild()
        //console.log('primeira vez respondendo')
      } else if (!(answers[answerIndex] && answers[answerIndex].selected == peek)) { // se nao for mesma resposta
        removeAnswer(['onChild','openSheet'])
        //console.log('trocando resposta')
      } else if (answers[answerIndex] && answers[answerIndex].selected == peek) { //se for mesma resposta
        removeAnswer([])
        //console.log('retirando resposta')
      }


    // }

    // if (item.action[peek]?.rec === '' || item.action[peek]?.rec) {
    //   dispatch({type: 'ANSWER',payload:{peek,itemId:item.id,groupId}})
    // }
    if (selected !== peek ) {
      //dispatch({type: 'ADD_RISK_ANSWER',payload:{peek,itemId:item.id,groupId,peekData:/* selected !== peek ?  */item.action[peek] /* : {} */}}) //o removido foi para caso ao reclicar na mesma opicao retirar dados
    } else {
      //dispatch({type: 'ADD_RISK_ANSWER_POSITION',payload:{peek,itemId:item.id,groupId}}) //o removido foi para caso ao reclicar na mesma opicao retirar dados
    }
  }

  function later() {
    dispatch({type: 'ANSWER_LATER',payload:{itemId:item.id,groupId}})
  }

  return (
    <View style={{flex:1}}>
      <ScrollView contentContainerStyle={{ flexGrow: 1}} showsVerticalScrollIndicator={false} style={{width:'100%',flex:1}}>
      <View style={{flexDirection:'row',justifyContent:'space-between',marginHorizontal:15}}>
          <TextGroup ellipsizeMode={'tail'} numberOfLines={1} >{group}</TextGroup>
          <TextProgress>{`${index+1}/${data.length}`}</TextProgress>
      </View>
      <View style={{flex:1,overflow:'visible'}}>
        <ViewTextContent windowHeight={windowHeight} style={{elevation:5}}>
          <TextQuestion animation="fadeIn" duration={1000} windowHeight={windowHeight} >{item.text}</TextQuestion>
        </ViewTextContent>
        <View style={{flex:1,justifyContent:'flex-start',marginHorizontal:20}}>
          {Object.keys(item.action).sort(Ascendent).map((key,indexKey)=>{
            return ( 
              <ButtonInitial
                key={key}
                secondary={answer?.selected && answer.selected == key}
                /* informe={modal?.selected && modal.selected == 'yes'} */
                iconName={model?.selected && model.selected == key ? 'Fingerprint' : false}
                iconColor={themeContext.primary.main} 
                iconPosition='right'
                onPress={()=>onAnswer(key,item?.selected)}
                scale={0.65*windowHeight/1000+0.23}
                elevation={true}
                text={item.action[key].text}
              />
            )
          })}

          {item?.parent &&
          <View style={{width:100}}>
            <TouchableOpacity style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'center',paddingTop:10,paddingBottom:10,marginBottom:5}} onPress={()=>onAnswer('goBack')}>
              <Icons name={'ArrowBack'} color={themeContext.text.third} size={18}/>
              <TextProgress>Voltar</TextProgress>
            </TouchableOpacity>
          </View>
          }
        </View>
      </View>
      </ScrollView>

      <View style={{flexDirection:'row',justifyContent:'flex-start',marginHorizontal:15}}>
        <View style={{flexDirection:'row',flex:1}}>
          <IconButton
            iconName='Camera'
            onPress={()=>onAnimatedFlip(-180)}
            style={{marginRight:5}}
            warn={''}
            info={''}
            color={themeContext.text.third}
          />
          <IconButton
            iconName='Doc'
            onPress={()=>onAnimatedFlip(180)}
            style={{marginRight:5}}
            color={themeContext.text.third}
          />
          <IconButton
            iconName={answer?.later?'QuestionFill':'Question'}
            scale={1.15}
            onPress={later}
            style={{marginRight:5,marginTop:-2,opacity:answer?.later?0.9:1}}
            color={answer?.later?themeContext.primary.lighter:themeContext.text.third}
          />
        </View>
        {item?.subText &&
          <IconButton
            iconName='Info'
            iconProps={{size:1.15*25}}
            onPress={() => reactModal.alert({text:item.subText,title:'Informação Adicional',warn:false})}
            style={{marginRight:-5}}
            color={themeContext.text.third}
          />
        }
      </View>
      </View>

  )
}
