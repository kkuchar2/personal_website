import { selectorAuth } from "appRedux/reducers/api/account";
import { StyledDashboard, StyledResponsiveReactGridLayout } from "components/Dashboard/style.js";
import { animatedWindowProps } from "components/FormComponents/animation.js";

import React, { useCallback, useEffect, useRef, useState } from "react";

import 'react-grid-layout/css/styles.css';
import { useDispatch, useSelector } from "react-redux";
import 'react-resizable/css/styles.css';

const Dashboard = (props) => {

    const ref = useRef(null);
    const mapRef = useRef(null);

    const authState = useSelector(selectorAuth);
    const dispatch = useDispatch();

    const [width, setWidth] = useState(0);
    const [rowHeight, setRowHeight] = useState(50);
    const [marginX, setMarginX] = useState(10);
    const [marginY, setMarginY] = useState(10);
    const [height, setHeight] = useState(1000);
    const [maxRows, setMaxRows] = useState(3);

    const cols = {lg: 12, md: 10, sm: 6, xs: 4, xxs: 2};

    const availableHandles = ["s", "w", "e", "n", "sw", "nw", "se", "ne"];

    const layouts = {
        lg: [
            {i: 'a', x: 0, y: 0, w: 1, h: 1},
            {i: 'b', x: 1, y: 0, w: 1, h: 1},
            {i: 'c', x: 4, y: 0, w: 1, h: 1},
            {i: 'd', x: 6, y: 0, w: 1, h: 1},
            {i: 'e', x: 6, y: 0, w: 3, h: 2},
            {i: 'f', x: 6, y: 0, w: 1, h: 1}
        ],
        md: [
            {i: 'a', x: 0, y: 0, w: 1, h: 1},
            {i: 'b', x: 1, y: 0, w: 3, h: 3},
            {i: 'c', x: 4, y: 0, w: 3, h: 3},
            {i: 'd', x: 6, y: 0, w: 3, h: 3},
            {i: 'e', x: 6, y: 0, w: 6, h: 3},
            {i: 'f', x: 6, y: 0, w: 6, h: 3}
        ],
        sm: [
            {i: 'a', x: 0, y: 0, w: 1, h: 1},
            {i: 'b', x: 1, y: 0, w: 1, h: 1},
            {i: 'c', x: 4, y: 0, w: 1, h: 1},
            {i: 'd', x: 6, y: 0, w: 2, h: 1},
            {i: 'e', x: 6, y: 0, w: 2, h: 1},
            {i: 'f', x: 6, y: 0, w: 3, h: 1}
        ]
    };

    const breakpoints = {lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0};

    useEffect(() => {
        setRowHeight((height - (maxRows + 1) * marginY) / maxRows);
    }, [height, marginX, marginY, maxRows]);

    useEffect(() => {
        setWidth(ref.current.state.width);
    }, [ref]);

    const onLayoutChange = useCallback((v) => {

    }, []);

    const onBreakpointChange = useCallback((breakpoint) => {

    }, [width, layouts, marginX]);

    const onMapCreated = () => {

    };

    const onResize = () => {
        if (mapRef.current) {
            mapRef.current.invalidateSize(false);
        }
    };

    return <StyledDashboard {...animatedWindowProps}>
        <StyledResponsiveReactGridLayout style={{height: "100%"}} ref={ref}

                                         className="layout" layouts={layouts}
                                         measureBeforeMount={false}
                                         breakpoints={breakpoints}
                                         rowHeight={rowHeight}
                                         onResize={onResize}
                                         resizeHandles={availableHandles}
                                         onLayoutChange={onLayoutChange}
                                         onBreakpointChange={onBreakpointChange}
                                         width={1200}
                                         maxRows={maxRows}
                                         margin={[marginX, marginY]}
                                         compactType={'vertical'}
                                         cols={cols}>
        </StyledResponsiveReactGridLayout>
    </StyledDashboard>;
};

export default Dashboard;