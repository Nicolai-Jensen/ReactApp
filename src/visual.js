import React, { useState, useEffect } from "react";
import './game.css';

const GridContainer = (props) => {
    const [effectVisibility, setEffectVisibility] = useState([]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setEffectVisibility(new Array(props.effects.length).fill(false));
        }, 150);

        return () => clearTimeout(timer); // Clear timeout on unmount
    }, [props.effects]); // Re-run effect when props.effects changes

    useEffect(() => {
        setEffectVisibility(new Array(props.effects.length).fill(true));
    }, [props.effects]); // Re-run effect when props.effects changes
    
    return (
        <div className="grid-container">
            {/* Render ground tiles */}
            {props.ground.map((tile, index) => (
                <img
                    key={index}
                    className="grid-item ground"
                    src={`./tiles/tile_${tile}.png`}
                    style={{ width: '24px', height: '24px' }} // Scale down ground tiles to half size
                />

            ))}

            {/* Render other tiles */}
            {props.movables.map((tile, index) => (
                <img
                    key={index}
                    className={`grid-item movable ${tile.id} ${tile.flipped ? 'flip' : ''}`}
                    style={{ left: !isNaN(tile.xpos) ? tile.xpos * 24 : 0, top: !isNaN(tile.ypos) ? tile.ypos * 24 : 0, width: '24px', height: '24px' }} // Scale down other tiles to half size
                    src={`./tiles/tile_${tile.tile}.png`}
                />
            ))};

            {props.clutter.map((tile, index) => (
                <img
                    key={index}
                    className={`grid-item clutter ${tile.id} ${tile.flipped ? 'flip' : ''}`}
                    style={{ left: !isNaN(tile.xpos) ? tile.xpos * 24 : 0, top: !isNaN(tile.ypos) ? tile.ypos * 24 : 0, width: '24px', height: '24px' }} // Scale down clutter tiles to half size
                    src={`./tiles/tile_${tile.tile}.png`}
                />
            ))};

            {
                props.effects.map((tile, index) => (
                    <img
                        key={index}
                        className={`grid-item effect ${tile.id} ${tile.flipped ? 'flip' : ''}`}
                        style={{ left: !isNaN(tile.xpos) ? tile.xpos * 24 : 0, top: !isNaN(tile.ypos) ? tile.ypos * 24 : 0, width: '24px', height: '24px' }} // Scale down effect tiles to half size
                        src={`./tiles/tile_${tile.tile}.png`}
                    />
                ))}
        </div>
    );
};

export function World(props) {
    const gameServerObj = props.gameServer;
    const [info, setInfo] = useState({});
    const [ground, setGround] = useState([]);
    const [movables, setMovables] = useState([]);
    const [clutter, setClutter] = useState([]);
    const [effects, setEffects] = useState([]);

    useEffect(() => {
        gameServerObj.onEvent("WorldUpdate", response => {
            if (response === undefined) {
                return;
            }
            if (response.info)
                setInfo(response.info)
            if (response.movables)
                setMovables(response.movables)
            if (response.ground)
                setGround(response.ground)
            if (response.clutter)
                setClutter(response.clutter)
            if (response.effects)
                setEffects(response.effects)

        });
    },);
    


    return (
        <>
            <GridContainer info={info} ground={ground} movables={movables} clutter={clutter} effects={effects} /> {/* Include the grid container component */}
        </>
    );
}

