import { View, Text , TouchableOpacity   } from 'react-native'
import { useState ,  useRef , useCallback, useEffect}from 'react'
import  {CameraView , useCameraPermissions} from 'expo-camera'
import { useNavigation } from '@react-navigation/native'
import analyze from '../api/analysis'
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';


const scanning = () => {
    const [permission, requestPermission] = useCameraPermissions();
    const [Image, setImage] = useState(null);
    const cameraRef = useRef(null);
    const [gallerypermission, requestGalleryPermission] = MediaLibrary.usePermissions();


    const navigation = useNavigation();

    if(!permission){
        return <View/>
    }


    const takePicture = async () => {
        if (cameraRef.current) {
          try {
            const photo = await cameraRef.current.takePictureAsync();
            if (!gallerypermission?.granted) {
                const { status } = await requestGalleryPermission();
                if (status !== 'granted') {
                    alert('Sorry, we need gallery permissions to save the photo.');
                    return;
                }
            }
            const asset = await MediaLibrary.createAssetAsync(photo.uri);
            await MediaLibrary.createAlbumAsync("Expo Camera", asset, false);
            setImage(asset.uri);
            navigation.navigate({ name: "Output", params: { photo: photo.uri } });
          } catch (e) {
            console.log(e);
          }
        }
      };

      


    return (
    <View className='flex-1'>
        <View className='w-full h-full'>
        <CameraView style={{flex:1, height:'100%',width:'100%'}} ref={cameraRef}>
        <View className='flex-1 items-center justify-end pb-10 '>
        <TouchableOpacity
        onPress={takePicture}
        className='w-20 h-20 rounded-full items-center justify-center border-8 border-neutral-100 shadow-400 bg-neutral-400'
        >
        </TouchableOpacity>
        </View>
        </CameraView>
            </View>

    </View>
    )
}

export default scanning