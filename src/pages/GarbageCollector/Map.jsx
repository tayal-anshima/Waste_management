import { Box, Flex, HStack, SkeletonText, Text} from '@chakra-ui/react'
import { useJsApiLoader, GoogleMap, Marker, DirectionsRenderer } from '@react-google-maps/api'
import { useRef, useState } from 'react'

let pos;
navigator.geolocation.getCurrentPosition(
    (position) => {
    pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
    }
    console.log(pos);
}, (error)=>{
    console.log(error)
}, {enableHighAccuracy: true, timeout: 5000, maximumAge: 0})

function Map() {

const { isLoaded } = useJsApiLoader({
    googleMapsApiKey:'AIzaSyAdRMuL8uVaUfeLk-xzq7asmLwGw7P4zEU',
    libraries: ['places'],
})

const [map, setMap] = useState(/** @type google.maps.Map */ (null))
const [directionsResponse, setDirectionsResponse] = useState(null)
const [distance, setDistance] = useState('')
const [duration, setDuration] = useState('')

// /** @type React.MutableRefObject<HTMLInputElement> */
// const originRef = useRef()
// /** @type React.MutableRefObject<HTMLInputElement> */
// const destiantionRef = useRef()

if (!isLoaded) {
    return <SkeletonText />
}

async function calculateRoute() {
    // Db query to get location data as a string in array
    // let arr = db.get();
    let wypts = []
    let arr = ["Mega Mall Gurgaon", "Maharaja Agrasen Institute of Technology"];
    let dest = arr[arr.length-1];
    for(let i = 0; i < arr.length-1; i++){
        wypts.push({location:arr[i], stopover: true});
    }
    let curr = pos;
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService()
    const results = await directionsService.route({
    origin: curr,
    destination: dest,
    waypoints:wypts,
    // eslint-disable-next-line no-undef
    travelMode: google.maps.TravelMode.DRIVING,
    })
    setDirectionsResponse(results)
    setDistance(results.routes[0].legs[0].distance.text)
    setDuration(results.routes[0].legs[0].duration.text)
}

function clearRoute() {
    setDirectionsResponse(null)
    setDistance('')
    setDuration('')
}

return (
    <Flex
    position='relative'
    flexDirection='column'
    alignItems='center'
    h='100vh'
    w='100vw'
    >
    <Box position='absolute' left={0} top={0} h='100%' w='100%'>
        {/* Google Map Box */}
        <GoogleMap
        center={pos}
        zoom={15}
        mapContainerStyle={{ width: '100%', height: '100%' }}
        options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
        }}
        onLoad={calculateRoute}
        >
        <Marker position={pos} />
        {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
        )}
        </GoogleMap>
    </Box>
    <Box
        p={4}
        borderRadius='lg'
        m={4}
        bgColor='white'
        shadow='base'
        minW='container.md'
        zIndex='1'
    >
        {/* <HStack spacing={2} justifyContent='space-between'>
        <Box flexGrow={1}>
            <Autocomplete>
            <Input type='text' placeholder='Origin' ref={originRef} />
            </Autocomplete>
        </Box>
        <Box flexGrow={1}>
            <Autocomplete>
            <Input
                type='text'
                placeholder='Destination'
                ref={destiantionRef}
            />
            </Autocomplete>
        </Box>
        </HStack> */}
        <HStack spacing={4} mt={4} justifyContent='space-between'>
            <Text>Distance: {distance} </Text>
            <Text>Duration: {duration} </Text>
        </HStack>
    </Box>
    </Flex>
)
}

export default Map