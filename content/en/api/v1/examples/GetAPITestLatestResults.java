import com.datadog.api.v2.client.api.SyntheticsApi;

public class SyntheticsApiExample {

    public static void main(String[] args) {
        SyntheticsApi apiInstance = new SyntheticsApi();
        String publicId = publicId_example; // String | The public id of the test for which to search results for
        SyntheticsGetTestLatestResultsPayload body = ; // SyntheticsGetTestLatestResultsPayload | 
        try {
            SyntheticsGetAPITestLatestResultsResponse result = apiInstance.getAPITestLatestResults(publicId, body);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling SyntheticsApi#getAPITestLatestResults");
            e.printStackTrace();
        }
    }
}