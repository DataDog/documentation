import com.datadog.api.v1.client.api.SyntheticsApi;

public class SyntheticsApiExample {

    public static void main(String[] args) {
        SyntheticsApi apiInstance = new SyntheticsApi();
        String publicId = publicId_example; // String | The public id of the browser test for which to search results for.
        SyntheticsGetTestLatestResultsPayload body = ; // SyntheticsGetTestLatestResultsPayload | 
        try {
            SyntheticsGetBrowserTestLatestResultsResponse result = apiInstance.getBrowserTestLatestResults(publicId, body);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling SyntheticsApi#getBrowserTestLatestResults");
            e.printStackTrace();
        }
    }
}