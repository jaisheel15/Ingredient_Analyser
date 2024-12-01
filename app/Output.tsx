import { View, Text , Image ,TouchableOpacity} from 'react-native'
import { useState ,  useEffect, useCallback}from 'react'
import analyze from './api/analysis'
import { useRoute } from '@react-navigation/native';



const Output = () => {
  const route = useRoute();
  const { photo } = route.params;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await analyze(photo, setLoading, setData);
      setLoading(false);
    };
    fetchData();
  }, [photo]);

  if (!photo) {
    return null;
  }


  return (
    <View className='flex-1'>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <Text>{data}</Text>
        
      )
      }
    </View>

  );
};

export default Output;