import com.datadog.api.v1.client.api.HostsApi;

public class HostsApiExample {

    public static void main(String[] args) {
        HostsApi apiInstance = new HostsApi();
        String hostName = hostName_example; // String | Name of the host to mute
        HostMuteSettings body = ; // HostMuteSettings | 
        try {
            HostMuteResponse result = apiInstance.muteHost(hostName, body);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling HostsApi#muteHost");
            e.printStackTrace();
        }
    }
}