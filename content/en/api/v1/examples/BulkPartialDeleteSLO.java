import com.datadog.api.v2.client.api.SLOApi;

public class SLOApiExample {

    public static void main(String[] args) {
        SLOApi apiInstance = new SLOApi();
        map[String, array[SLOTimeframe]] body = ; // map[String, array[SLOTimeframe]] | 
        try {
            ServiceLevelObjectivesBulkDeleted result = apiInstance.bulkPartialDeleteSLO(body);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling SLOApi#bulkPartialDeleteSLO");
            e.printStackTrace();
        }
    }
}