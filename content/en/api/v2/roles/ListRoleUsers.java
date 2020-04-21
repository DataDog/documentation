import com.datadog.api.v2.client.api.RolesApi;

public class RolesApiExample {

    public static void main(String[] args) {
        RolesApi apiInstance = new RolesApi();
        String roleId = roleId_example; // String | The ID of the role.
        Long pageLeft_Square_BracketsizeRight_Square_Bracket = 789; // Long | Number of users to return for a given page.
        Long pageLeft_Square_BracketnumberRight_Square_Bracket = 789; // Long | Specific page number to return.
        String sort = sort_example; // String | User attribute to order results by. Sort order is **ascending** by default.
Sort order is **descending** if the field is prefixed by a negative sign,
for example `sort=-name`. Options: `name`, `email`, `status`.
        String filter = filter_example; // String | Filter all users by the given string. Defaults to no filtering.
        try {
            UsersResponse result = apiInstance.listRoleUsers(roleId, pageLeft_Square_BracketsizeRight_Square_Bracket, pageLeft_Square_BracketnumberRight_Square_Bracket, sort, filter);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling RolesApi#listRoleUsers");
            e.printStackTrace();
        }
    }
}