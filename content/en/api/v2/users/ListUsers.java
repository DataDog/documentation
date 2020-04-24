import com.datadog.api.v2.client.api.UsersApi;

public class UsersApiExample {

    public static void main(String[] args) {
        UsersApi apiInstance = new UsersApi();
        Long pageLeft_Square_BracketsizeRight_Square_Bracket = 789; // Long | Number of users to return for a given page.
        Long pageLeft_Square_BracketnumberRight_Square_Bracket = 789; // Long | Specific page number to return.
        String sort = sort_example; // String | User attribute to order results by. Sort order is ascending by default. Sort order is descending if the field is prefixed by a negative sign, for example `sort=-name`. Options: `name`, `modified_at`, `user_count`.
        QuerySortOrder sortDir = ; // QuerySortOrder | Direction of sort. Options: `asc`, `desc`.
        String filter = filter_example; // String | Filter all users by the given string. Defaults to no filtering.
        String filterLeft_Square_BracketstatusRight_Square_Bracket = filterLeft_Square_BracketstatusRight_Square_Bracket_example; // String | Filter on status attribute.
Comma separated list, with possible values `Active`, `Pending`, and `Disabled`.
Defaults to no filtering.
        try {
            UsersResponse result = apiInstance.listUsers(pageLeft_Square_BracketsizeRight_Square_Bracket, pageLeft_Square_BracketnumberRight_Square_Bracket, sort, sortDir, filter, filterLeft_Square_BracketstatusRight_Square_Bracket);
            System.out.println(result);
        } catch (ApiException e) {
            System.err.println("Exception when calling UsersApi#listUsers");
            e.printStackTrace();
        }
    }
}