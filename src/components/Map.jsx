import {If, Then, Else} from 'react-if';
import map from "../assets/map.png";

// Read in from .env.local file and live, it comes from "Environment Variables"
const API_KEY = import.meta.env.VITE_API_KEY;

function Map(props) {

  // Lat and Lon from props ...
  // Key from the .env
  // Build a URL

  // https://maps.locationiq.com/v3/staticmap?key=<YOUR_ACCESS_TOKEN>&center=<latitude>,<longitude>&zoom=<zoom>&size=<width>x<height>&format=<format>&maptype=<MapType>&markers=icon:<icon>|<latitude>,<longitude>&markers=icon:<icon>|<latitude>,<longitude>

   // { this ? that : somethingElse }
  return (
    <If condition={props.latitude && props.longitude}>
      <Then>
      <figure>
        <img src={`https://maps.locationiq.com/v3/staticmap?key=${API_KEY}&center=${props.latitude},${props.longitude}&size=400x300&format=png`} width="500" />
      </figure>
    </Then>
    <Else>
      <figure>
        <img src ={map} width="500" />
      </figure>
    </Else>
    </If>
  )
}

export default Map;