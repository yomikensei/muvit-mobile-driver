import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import BackgroundGeolocation from '@mauron85/react-native-background-geolocation';
import { getIsLoggedIn } from 'services/auth/reducer';
import api from 'services/api';

export default WrappedComponent =>
  connect(mapStateToProps)(({ isLoggedIn }) => {
    const configureBackgroundLocation = () => {
      BackgroundGeolocation.configure({
        desiredAccuracy: BackgroundGeolocation.HIGH_ACCURACY,
        stationaryRadius: 0,
        distanceFilter: 0,
        notificationTitle: 'Background GeoTracking',
        notificationText: '',
        startForeground: true,
        startOnBoot: true,
        stopOnTerminate: false,
        locationProvider: BackgroundGeolocation.ACTIVITY_PROVIDER,
        interval: 1000 * 10,
        fastestInterval: 1000 * 10,
        activitiesInterval: 1000 * 10,
        stopOnStillActivity: false,
      });

      BackgroundGeolocation.on('location', ({ longitude, latitude }) => {
        BackgroundGeolocation.startTask(async taskKey => {
          try {
            await api({
              url: '/location',
              method: 'POST',
              data: [
                {
                  geo_coordinates: [latitude, longitude],
                },
              ],
            });
          } catch (e) {
            console.log(e.response ? e.response : e);
          }
          BackgroundGeolocation.endTask(taskKey);
        });
      });

      BackgroundGeolocation.checkStatus(status => {
        BackgroundGeolocation.start();
      });
    };

    useEffect(() => {
      if (isLoggedIn) configureBackgroundLocation();
      else BackgroundGeolocation.stop();
    }, [isLoggedIn]);

    return <WrappedComponent />;
  });

const mapStateToProps = state => ({
  isLoggedIn: getIsLoggedIn(state),
});
