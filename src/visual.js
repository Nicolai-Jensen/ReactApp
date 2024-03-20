import React, { useState, useEffect } from "react";
import './game.css';

const GridContainer = (props) => {
    return (
        <div className="grid-container">
            {/* Render ground tiles */}
            {props.ground.map((tile, index) => (
                <img
                    key={index}
                    className="grid-item ground"
                    src={`./tiles/tile_${tile}.png`}
                />
            ))}

            {/* Render other tiles */}
            {props.movables.map((tile, index) => (
                <img
                    key={index}
                    className={`grid-item ${tile.id} ${tile.flipped ? 'flip' : ''}`}
                    style={{ left: !isNaN(tile.xpos) ? tile.xpos * 48 : 0, top: !isNaN(tile.ypos) ? tile.ypos * 48 : 0 }}
                    src={`./tiles/tile_${tile.tile}.png`}
                />
            ))};

            {props.clutter.map((tile, index) => (
                <img
                    key={index}
                    className={`grid-item ${tile.id} ${tile.flipped ? 'flip' : ''}`}
                    style={{ left: !isNaN(tile.xpos) ? tile.xpos * 48 : 0, top: !isNaN(tile.ypos) ? tile.ypos * 48 : 0 }}
                    src={`./tiles/tile_${tile.tile}.png`}
                />
            ))};

            {
                props.effects.map((tile, index) => (
                    <img
                        key={index}
                        className={`grid-item ${tile.id} ${tile.flipped ? 'flip' : ''}`}
                        style={{ left: !isNaN(tile.xpos) ? tile.xpos * 48 : 0, top: !isNaN(tile.ypos) ? tile.ypos * 48 : 0 }}
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

    //console.log(movables);


    return (
        <>
            <GridContainer info={info} ground={ground} movables={movables} clutter={clutter} effects={effects} /> {/* Include the grid container component */}
        </>
    );
}

