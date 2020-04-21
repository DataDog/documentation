import com.datadog.api.v1.client.api.SyntheticsApi;

public class SyntheticsApiExample {

    public static void main(String[] args) {
        SyntheticsApi apiInstance = new SyntheticsApi();
        String publicId = publicId_example; // String | The public id of the browser test for which to search results for.
        Long fromTs = 789; // Long | Timestamp from which to start querying results.
        Long toTs = 789; // Long | Timestamp up to which to query results.
        array[String] probeDc = ; // array[String] | Locations for which to query results.
        try {
            SyntheticsGetBrowserTestLatestResultsResponse result = apiInstance.getBrowserTestLatestResults(publicId, fromTs, toTs, probeDc);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling SyntheticsApi#getBrowserTestLatestResults");
            e.printStackTrace();
        }
    }
}