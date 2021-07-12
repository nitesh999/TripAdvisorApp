import React, { useEffect, useState, useMemo } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  ActivityIndicator,
  Alert
} from 'react-native';
import Dropdown from './src/components/Dropdown'
import Button from './src/components/Button'
import TabText from './src/components/TabText'
import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import { getTripDetails } from './src/ShortestPathFinder';
import TRIP_DETAILS_RESPONSE, { PleaseSelectDropdownString } from './src/Strings'
import AppStyles from './src/AppStyles'
import { MemoizedJourneyList } from './src/components/JourneyList'

var deals = null
var dealReferenceMap = null
var popupDropdownFromCity = null
var popupDropdownToCity = null
var tabTextCheapest = null
var tabTextFastest = null
var fromCity = ''
var toCity = ''
const App = () => {

  const [isLoading, setIsLoading] = useState(true);
  const [isCheapest, setIsCheapest] = useState(true);
  const [isFastest, setIsFastest] = useState(false);
  const [cities, setCities] = useState(null);
  const [search, setSearch] = useState(0);

  const tripDetails = useMemo(() => {
    if (search != 0) {
      setIsLoading(true)
      let tripDetailsObject = {}
      let tripDetailsArray = getTripDetails(deals, dealReferenceMap, isCheapest ? 'Cheapest' : 'Fastest', fromCity, toCity);
      let unitTotals = getUnitTotals(tripDetailsArray)
      tripDetailsObject.tripDetailsArray = tripDetailsArray
      tripDetailsObject.unitTotals = unitTotals
      setIsLoading(false)
      return tripDetailsObject
    } else
      return []
  }, [search, isCheapest])

  useEffect(() => {
    tabTextCheapest = React.createRef();
    tabTextFastest = React.createRef();
    popupDropdownFromCity = React.createRef();
    popupDropdownToCity = React.createRef();
    deals = TRIP_DETAILS_RESPONSE.deals
    dealReferenceMap = getDealReferenceMap(deals);
    let cities = getCities(deals)
    setCities(cities)
    setIsLoading(false)
  }, [])

  useEffect(() => {
    setIsFastest(!isCheapest)
  }, [isCheapest])

  useEffect(() => {
    setIsCheapest(!isFastest)
  }, [isFastest])


  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaView style={[AppStyles.container]}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ActivityIndicator animating={isLoading} size="large" style={{ opacity: 1 }} color="#999999" />
      <View
        style={{
          backgroundColor: isDarkMode ? Colors.black : Colors.white, flex: 1
        }}
        onStartShouldSetResponder={() => {
          //on click anywhere else on the screen
          popupDropdownFromCity.current.close()
          popupDropdownToCity.current.close()
        }
        }>

        <Dropdown
          ref={popupDropdownFromCity}
          title={PleaseSelectDropdownString}
          list={cities}
          onPress={city => fromCity = city}
        />
        <Dropdown
          style={[AppStyles.marginTop10]}
          ref={popupDropdownToCity}
          title={PleaseSelectDropdownString}
          list={cities}
          onPress={city => toCity = city}
        />
        <View style={[AppStyles.flexRowContainer, AppStyles.marginTop5]}>
          <TabText
            ref={tabTextCheapest}
            isSelected={isCheapest}
            onPress={isSelected => {
              setIsCheapest(isSelected)
            }
            }>
            Cheapest
          </TabText>
          <View style={AppStyles.dividerHorLineStyle} />
          <TabText
            ref={tabTextFastest}
            isSelected={isFastest}
            onPress={isSelected => {
              setIsFastest(isSelected)
            }
            }>
            Fastest
          </TabText>
        </View>
        <Button
          onPress={() => {
            if (fromCity && toCity)
              setSearch(Math.random())
            else
              onClick(fromCity, toCity)
          }}
          additionalStyle={AppStyles.marginTop5}
        >
          Search
        </Button>
        {search != 0 && (
          <MemoizedJourneyList
            search={search}
            isCheapest={isCheapest}
            tripDetails={tripDetails.tripDetailsArray}
            tripTotals={tripDetails.unitTotals}
          ></MemoizedJourneyList>
        )
        }
      </View>
    </SafeAreaView>
  );
};

function onClick(fromCity, toCity) {
  let body = ""
  if (!fromCity)
    body = "Please select from city"
  if (!toCity)
    body = body + '\nPlease select to city'

  Alert.alert(body);
}

function getCities(deals) {
  var cityHashmap = {};
  var cities = [];
  for (var i in deals) {
    var deal = deals[i];

    if (!cityHashmap[deal.departure]) {
      cityHashmap[deal.departure] = 1;
      cities.push(deal.departure);
    }

    if (!cityHashmap[deal.arrival]) {
      cityHashmap[deal.arrival] = 1;
      cities.push(deal.arrival);
    }
  }

  cities.sort(); // alphabetical order
  return cities;
}

function getDealReferenceMap(deals) {
  var dealsMap = [];
  for (var i in deals) {
    dealsMap[deals[i].reference] = deals[i];
  }
  return dealsMap;
}

function getUnitTotals(trips) {
  var unitTotals = { tripsCount: trips.length, cost: 0, savings: 0, time: { h: 0, m: 0 }, transportCount: { bus: 0, car: 0, train: 0 } };
  for (var i in trips) {
    var trip = trips[i];
    unitTotals.cost += trip.cost * (1 - (trip.discount * .01));
    unitTotals.savings += trip.cost * (trip.discount * .01);
    unitTotals.time.h += parseInt(trip.duration.h);
    unitTotals.time.m += parseInt(trip.duration.m);
    unitTotals.transportCount[trip.transport] += 1;
  }

  if (unitTotals.time.m >= 60) {
    var newMinutes = unitTotals.time.m % 60;
    var addHours = parseInt(unitTotals.time.m / 60);
    unitTotals.time.h += addHours;
    unitTotals.time.m = newMinutes;
  }

  if (unitTotals.time.h < 10)
    unitTotals.time.h = '0' + unitTotals.time.h;

  if (unitTotals.time.m < 10)
    unitTotals.time.m = '0' + unitTotals.time.m;

  return unitTotals;
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
