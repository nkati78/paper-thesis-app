'use client';
import React, { useRef } from 'react';
import { Provider } from 'react-redux';
import { makeStore, AppStore, PreloadedState } from './store';

export default function StoreProvider({
    children,
    preloadedState
}: {
    children: React.ReactNode;
    preloadedState?: PreloadedState;
}) {

    const storeRef = useRef<AppStore>();

    if (!storeRef.current) {

        storeRef.current = makeStore(preloadedState);

    }

    return <Provider store={storeRef.current}>{children}</Provider>;

}