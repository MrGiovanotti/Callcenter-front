export class ConstantsUtils {

   // ================= CONFIGURATION ===================
   public static BACKEND_URL = 'http://localhost:8080/nashira-callcenter';
   public static NUM_OF_PAGES_PAGINATOR = 5;

   // ================= BACKEND CREDENTIALS =============
   public static CLIENT_ID = 'nashiracallcenterfront';
   public static CLIENT_SECRET = 'nash.solutions2019';

   // ================ GLOBAL KEYS AND WORDS =============
   public static IMAGE_KEY_FOR_LOCAL_STORAGE = 'image';

   // ===================== ROUTES ====================
   public static DASHBOARD_ROUTE = 'dashboard';
   public static LOGIN_ROUTE = 'login';
   public static LIST_USERS_ROUTE = 'users/page/:page';
   public static FORBIDDEN_ROUTE = 'forbidden';
   public static CREATE_USER_ROUTE = 'users/create';
   public static UPDATE_USER_ROUTE = 'users/update/:id';
   public static SHOW_USER_ROUTE = 'users/show/:id';
   public static SEARCH_USER_ROUTE = 'users/search/:name';
   public static NOT_FOUND_ROUTE = 'not-found';
}
