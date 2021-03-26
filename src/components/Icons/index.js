import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Bio from '../../assets/risks/biological-hazard.svg';
//import Bio from '../../assets/risks/biohazard.svg';
import Qim from '../../assets/risks/test-tube.svg';
import Fis from '../../assets/risks/fire.svg';
import Erg from '../../assets/risks/passenger.svg';
import Aci from '../../assets/risks/accident.svg';
//import Aci from '../../assets/risks/wounded.svg';

export default function Icons({name,...props}) {
    switch (name) {

        case 'Close':
            return <AntDesign name={'close'} {...props} />
        case 'Check':
            return <Ionicons name={'ios-checkmark-circle-outline'} {...props} />
        case 'Warn':
            return <AntDesign name={'warning'} {...props} />
        case 'UserEmail':
            return <FontAwesome name={'user-o'} {...props} />
        case 'User':
            return <FontAwesome name={'user-circle'} {...props} />
        case 'Lock':
            return <Ionicons name={'lock-closed-outline'} {...props} />
        case 'SecureOn':
            return <Ionicons name={'ios-eye-off-outline'} {...props} />
        case 'SecureVisible':
            return <Ionicons name={'ios-eye-outline'} {...props} />
        case 'Menu':
            return <Ionicons name={'ios-menu'} {...props} />
        case 'ArrowLeft':
            return <Ionicons name={'chevron-back'} {...props} />
        case 'ArrowRight':
            return <Ionicons name={'chevron-forward'} {...props} />
        case 'ArrowBack':
            return <Ionicons name={'arrow-back'} {...props} />
        case 'Apps':
            return <Ionicons name={'apps'} {...props} />
        case 'Camera':
            return <Ionicons name={'ios-camera-outline'} {...props} /> //ios-camera
        case 'Doc':
            return <Ionicons name={'document-text-outline'} {...props} />
        case 'Fingerprint':
            return <Ionicons name={'finger-print-outline'} {...props} />
        case 'Plus':
            return <AntDesign name={'plus'} {...props} />
        case 'Help':
            return <Ionicons name={'ios-help-circle-outline'} {...props} />
        case 'Image':
            return <Ionicons name={'md-image-outline'} {...props} />
        case 'NoImages':
            return <MaterialCommunityIcons name={'image-off-outline'} {...props} />
        case 'Upload':
            return <MaterialCommunityIcons name={'upload'} {...props} />
        case 'UploadFail':
            return <MaterialCommunityIcons name={'upload-off-outline'} {...props} />
        case 'Trash':
            return <Ionicons name={'ios-trash-outline'} {...props} />
        case 'DoubleCheck':
            return <Ionicons name={'ios-checkmark-done'} {...props} />


        case 'fis':
            return <Fis width={25} height={25} {...props} />
        case 'qim':
            return <Qim width={25} height={25} {...props} />
        case 'bio':
            return <Bio width={25} height={25} {...props} />
        case 'rrg':
            return <Erg width={25} height={25} {...props} />
        case 'aci':
            return <Aci width={25} height={25} {...props} />

/*         case 'Load':
            return (
            <div {...props}>
                <LottieAnimation  lotti='loader' height={30} width={30} isClickToPauseDisabled={true} />
            </div>
            ) */
        default:
            return <AntDesign name={'close'} {...props} />
    }
}
