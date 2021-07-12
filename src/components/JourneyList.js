
import React, { useCallback } from 'react';
import { View, Text, FlatList } from 'react-native';
import AppStyles from '../AppStyles'

export function JourneyList({ search, isCheapest, tripDetails, tripTotals }) {

    const keyMapper = useCallback((item) => {
        item.reference
    }, [])

    const footer = () => {
        return (
            <View style={[AppStyles.flexRowContainer, AppStyles.marginTop10, AppStyles.paddingHorizontal5, AppStyles.paddingVertical5, AppStyles.containerGrey]}>
                <Text style={[AppStyles.flexContainer]}>Total</Text>
                <Text style={[AppStyles.flexContainer, AppStyles.centerContainer]}>{tripTotals.time.h}{'h'}{tripTotals.time.m}</Text>
                <Text style={[AppStyles.flexContainer, AppStyles.rightContainer]}>{tripTotals.cost}{'€'}</Text>
            </View>
        );
    };

    return (
        <FlatList
            style={[AppStyles.marginTop5]}
            data={tripDetails}
            keyExtractor={keyMapper}
            renderItem={renderItem}
            ListFooterComponent={footer}
            
        ></FlatList>
    );
}

const renderItem = ({ item }) => (
    <View style={[AppStyles.marginTop5, AppStyles.paddingHorizontal5, AppStyles.paddingVertical5, AppStyles.containerGrey]}>
        <View style={[AppStyles.flexRowContainer]}>
            <Text>{item.departure} {'>'} {item.arrival}</Text>
            <Text style={[AppStyles.flexContainer, AppStyles.rightContainer]}>{item.cost}{'€'}</Text>
        </View>
        <Text>{item.transport} { } {item.reference} for {item.duration.h}{'h'}{item.duration.m}</Text>
    </View>
);

function areEqual(prevProps, nextProps) {
    return prevProps.search === nextProps.search
        && prevProps.isCheapest === nextProps.isCheapest
}

export const MemoizedJourneyList = React.memo(JourneyList, areEqual);