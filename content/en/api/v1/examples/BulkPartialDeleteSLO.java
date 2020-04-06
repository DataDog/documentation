import com.datadog.api.v1.client.api.ServiceLevelObjectivesApi;

public class ServiceLevelObjectivesApiExample {

    public static void main(String[] args) {
        ServiceLevelObjectivesApi apiInstance = new ServiceLevelObjectivesApi();
        map[String, array[SLOTimeframe]] body = ; // map[String, array[SLOTimeframe]] | 
        try {
            ServiceLevelObjectivesBulkDeleted result = apiInstance.bulkPartialDeleteSLO(body);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling ServiceLevelObjectivesApi#bulkPartialDeleteSLO");
            e.printStackTrace();
        }
    }
}