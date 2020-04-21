import com.datadog.api.v2.client.api.RolesApi;

public class RolesApiExample {

    public static void main(String[] args) {
        RolesApi apiInstance = new RolesApi();
        Long pageLeft_Square_BracketsizeRight_Square_Bracket = 789; // Long | Number of users to return for a given page.
        Long pageLeft_Square_BracketnumberRight_Square_Bracket = 789; // Long | Specific page number to return.
        RolesSort sort = ; // RolesSort | Sort roles depending on the given field. Sort order is **ascending** by default.
Sort order is **descending** if the field is prefixed by a negative sign, for example:
`sort=-name`.
        String filter = filter_example; // String | Filter all roles by the given string.
        try {
            RolesResponse result = apiInstance.listRoles(pageLeft_Square_BracketsizeRight_Square_Bracket, pageLeft_Square_BracketnumberRight_Square_Bracket, sort, filter);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling RolesApi#listRoles");
            e.printStackTrace();
        }
    }
}