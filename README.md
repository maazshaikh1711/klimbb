APK and IOS(video) Link: https://drive.google.com/drive/folders/1ZciVTvI3ywNYDLvkQz08kzfsiNwtDScz 

BRIEF SOLUTION:

I have created a React Native CLI application named as “KC News”.
When opened it shows SplashScreen, and a background task runs to fetch a news from news API, and stores that news in offline storage (Async storage is used to store data offline).
After splash screen, a dynamic news is displayed. List of 5 news are taken from offline stored news and displayed, which gets refreshed every 10 seconds by default (pinned cards won’t get refreshed).
User can pin/unpin the news.
User can manually swipe unpinned card to delete.
User can manually refresh news. (pinned cards won’t get refreshed).
User can click on a card to see detail about the news.
User can manually edit the drip timer.

**Next API call is only done once the all offline stored news has been displayed.**


**NOTE: Extra News Share feature is also provided.**




STEPS TO RUN APPLICATION(npm installation needs to be done, when code is pulled, for iOS may need to modify Icon settings).

This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Start the Metro Server
To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```
