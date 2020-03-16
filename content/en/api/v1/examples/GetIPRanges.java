import com.datadog.api.v2.client.api.IPRangesApi;

public class IPRangesApiExample {

    public static void main(String[] args) {
        IPRangesApi apiInstance = new IPRangesApi();
        try {
            IPRanges result = apiInstance.getIPRanges();
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling IPRangesApi#getIPRanges");
            e.printStackTrace();
        }
    }
}