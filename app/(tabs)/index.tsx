import { Text, View } from "react-native";
import { useState , useEffect} from "react";
import * as MediaLibrary from 'expo-media-library'
export default function Index() {

  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    MediaLibrary.getAlbumAsync("Expo Camera").then((album) => {
      if (album) {
        MediaLibrary.getAssetsAsync({ album: album.id, first: 10 }).then((assets) => {  
          setPhotos(assets.assets);
        });
      }
    });
  }, []);

  photos.map((photo) => {
    console.log(photo.uri);
  });
  




  return (
    <View
      className="flex-1 items-center justify-center">
    </View>
  );
}
