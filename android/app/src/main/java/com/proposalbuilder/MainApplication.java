package com.proposalbuilder;

import android.app.Application;
import android.content.Context;
import com.facebook.react.PackageList;
import com.facebook.hermes.reactexecutor.HermesExecutorFactory;
import com.facebook.react.bridge.JavaScriptExecutorFactory;
import com.facebook.react.ReactApplication;
import com.reactnativecommunity.webview.RNCWebViewPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;
import java.lang.reflect.InvocationTargetException;
import com.reactnativenavigation.NavigationApplication;
import com.reactnativenavigation.react.NavigationReactNativeHost;
import com.reactnativenavigation.react.ReactGateway;
import io.invertase.firebase.notifications.RNFirebaseNotificationsPackage;
import io.invertase.firebase.messaging.RNFirebaseMessagingPackage;
// react-native-webview
import com.reactnativecommunity.webview.RNCWebViewPackage;
import java.util.List;
import java.util.Arrays;
// @react-native-community/async-storage
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
// react-native-firebase
import io.invertase.firebase.RNFirebasePackage;
// react-native-splash-screen
import org.devio.rn.splashscreen.SplashScreenReactPackage;
// react-native-vector-icons
import com.oblador.vectoricons.VectorIconsPackage;


public class MainApplication extends NavigationApplication {


              @Override
    protected ReactGateway createReactGateway() {
            ReactNativeHost host = new NavigationReactNativeHost(this, isDebug(), createAdditionalReactPackages()) {
            @Override
            protected String getJSMainModuleName() {
                        return "index";
                    }
        };
            return new ReactGateway(this, isDebug(), host);
        }

            @Override
    public boolean isDebug() {
            return BuildConfig.DEBUG;
        }

            protected List<ReactPackage> getPackages() {
            // Add additional packages you require here
                    // No need to add RnnPackage and MainReactPackage
                            return Arrays.<ReactPackage>asList(
                                    new AsyncStoragePackage(),
                                    new RNFirebasePackage(),
                                    new RNFirebaseNotificationsPackage(),
                                    new RNFirebaseMessagingPackage(),
                                    new SplashScreenReactPackage(),
                                    new VectorIconsPackage(),
                                    new RNCWebViewPackage()
                        // eg. new VectorIconsPackage()
                            );
        }

            @Override
    public List<ReactPackage> createAdditionalReactPackages() {
            return getPackages();
        }



//  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
//    @Override
//    public boolean getUseDeveloperSupport() {
//      return BuildConfig.DEBUG;
//    }
//
//    @Override
//    protected List<ReactPackage> getPackages() {
//      @SuppressWarnings("UnnecessaryLocalVariable")
//      List<ReactPackage> packages = new PackageList(this).getPackages();
//      // Packages that cannot be autolinked yet can be added manually here, for example:
//      // packages.add(new MyReactNativePackage());
//      return packages;
//    }
//
//    @Override
//    protected String getJSMainModuleName() {
//      return "index";
//    }
//  };
//
//  @Override
//  public ReactNativeHost getReactNativeHost() {
//    return mReactNativeHost;
//  }
//
//  @Override
//  public void onCreate() {
//    super.onCreate();
//    SoLoader.init(this, /* native exopackage */ false);
//  }
}
