"use client";

import { MapPin } from "lucide-react";
import Map, { Marker } from "react-map-gl/mapbox";
import Image from "next/image";
import "mapbox-gl/dist/mapbox-gl.css";

interface MapProps {
	coords: {
		latitude: number;
		longitude: number;
	};
}

export default function EventLocationMap({
	coords,
}: {
	coords: {
		latitude: number;
		longitude: number;
	};
}) {
	console.log(process.env.NEXT_PUBLIC_MAPKIT_TOKEN);

	return (
		<Map
			// https://visgl.github.io/react-map-gl/docs/get-started/mapbox-tokens
			mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN!}
			initialViewState={{
				longitude: coords.longitude,
				latitude: coords.latitude,
				zoom: 16,
				pitch: 50,
			}}
			style={{ width: 600, height: 400 }}
			mapStyle="mapbox://styles/mapbox/standard"
		>
			<Marker
				longitude={coords.longitude}
				latitude={coords.latitude}
				color="red"
			/>
		</Map>
	);
}
