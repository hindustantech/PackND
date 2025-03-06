// package com.packndtiffin.app;

// i
// import com.getcapacitor.BridgeActivity;

// import android.os.Bundle;


// public class MainActivity extends BridgeActivity {

   
// }



package com.packndtiffin.app;

import com.getcapacitor.BridgeActivity;
import android.os.Bundle;
import com.google.android.gms.common.ConnectionResult;
import com.google.android.gms.common.GooglePlayServicesUtil;

public class MainActivity extends BridgeActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // Optionally, initialize Google Play Services if needed
        if (GooglePlayServicesUtil.isGooglePlayServicesAvailable(this) == ConnectionResult.SUCCESS) {
            // Google Play Services is available, proceed with your app logic
        }
    }
}
