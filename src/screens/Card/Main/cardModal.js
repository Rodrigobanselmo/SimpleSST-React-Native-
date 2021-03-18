import React, {useContext,useState} from 'react';
import {ThemeContext} from "styled-components";
import {StyleSheet,Dimensions,View,ScrollView } from 'react-native';
import {useReactModal} from '../../../context/ModalContext'
import styled,{css} from "styled-components/native";
import {ButtonInitial,IconButton} from '../../../components/basicComponents/Button';
import ReactModal from '../../../components/modalComponents/ModalAlert';
import {ProgresseBar} from '../../../components/basicComponents/ProgresseBar';
import {ProgresseValue} from '../../../components/basicComponents/ProgresseValue';
import Icons from '../../../components/Icons'
import * as Animatable from 'react-native-animatable';
import ImagePicker from 'react-native-image-crop-picker';
import {v4} from "uuid";

import { TouchableOpacity,TextInput,FlatList } from 'react-native-gesture-handler';

const AddImage = styled.Image`
    width: 100%;
    height: 200px;
    margin-bottom: 15px;
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

const windowHeight = Dimensions.get('window').height

export const CardModal = ({image,setData,data,modalVisible,setModalVisible,addQuestionPhoto,answers}) => {
  
  const themeContext = useContext(ThemeContext);

  return (
    <ReactModal 
      title={'Configurações de Imagem'} 
      option={true} 
      warn={false} 
      onConfirm={()=>addQuestionPhoto({...data,path:image})} 
      open={modalVisible} 
      onClose={()=>setModalVisible(false)} 
      confirmButton='Confirmar'
      style={{width:'95%',maxHeight:'95%',alignItems:'center'}}
    >
    <ScrollView contentContainerStyle={{ flexGrow: 1}} showsVerticalScrollIndicator={false} style={{width:'100%'}}>
    {image != null ? <AddImage source={{uri: image}} /> : null}
    {data?.imageIndex ? <ProgresseBar percentage={answers.data[data.groupIndex].questions[data.itemIndex].image[data.imageIndex].percentage} style={{height:8,marginBottom:10,borderColor:themeContext.background.line}}/> : null}
      <TextProgress windowHeight={windowHeight}>Dados da imagem</TextProgress>
      <TextInput
        value={data.title}
        onChangeText={(value)=>{setData({...data,title:value})}}
        placeholder="Título"
        style={{paddingLeft: 10,padding:5,fontSize:15*windowHeight/1000+4.9,color: themeContext.text.primary,backgroundColor:themeContext.background.back,marginTop:15,borderRadius:10}}
        autoCapitalize="none"
        returnKeyType="next"
        textAlign="justify"
        numberOfLines={1}
        maxLength={300}
        textAlignVertical='top'
        />
        <TextInput
          value={data.desc}
          onChangeText={(value)=>{setData({...data,desc:value})}}
          placeholder="Descrição"
          style={{padding: 10,fontSize:15*windowHeight/1000+4.9,color: themeContext.text.primary,backgroundColor:themeContext.background.back,marginTop:15,marginBottom:5,borderRadius:10}}
          autoCapitalize="none"
          returnKeyType="next"
          textAlign="justify"
          numberOfLines={3}
          multiline={true}
          maxLength={100}
          textAlignVertical='top'
        />
        <ButtonInitial
          secondary={true}
          iconName={'Trash'}
          iconProps={{color:themeContext.primary.textInside,padding:0}}
          style={{marginBottom:15,backgroundColor:themeContext.status.fail}}
          iconPosition={'left'}
          onPress={()=>{}}
          scale={0.5}
          elevation={false}
          text='Deletar Imagem'
        />
      </ScrollView>
  </ReactModal>
  );
};