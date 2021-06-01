/*
 _________________________
 Stack Navigator Params
 _________________________
*/

export type RootStackParamList = {
  Root: undefined;
  SignupScreen: undefined;
  AboutUsScreen: undefined;
  DeleteAccountScreen: undefined;
  MenuScreen: undefined;
  BurgerScreen: undefined;
};

export type BottomTabParamList = {
  Chef: undefined;
  Menu: undefined;
  SavoredList: undefined;
};

export type LoggedOutParamList = {
  LoginScreen: undefined;
  SignupScreen: undefined;
  AboutUsScreen: undefined;
  MenuScreen: undefined;
};

export type LoggedInParamList = {
  ChefScreen: undefined;
  AboutUsScreen: undefined;
  LoginScreen: undefined;
  DeleteAccountScreen: undefined;
  MenuScreen: undefined;
  BurgerScreen: undefined;
};

export type MenuStackParamList = {
  MenuScreen: undefined;
  BurgerScreen: undefined;
};

export type SavoredListParamList = {
  SavoredListScreen: undefined;
  RecipeScreen: { recipeId: string };
};

/*
 _________________________
 Redux Store Objects
 _________________________
*/

// Core RootState interface
export interface RootState {
  userState: UserState;
  recipeState: RecipeState;
  userRecipeListState: UserRecipeListState;
  filtersState: FiltersState;
}

// Core User type
export type User = {
  id: string | undefined;
  username: string | null | undefined;
  image_url: string | null | undefined;
};

// Core UserState interface
export interface UserState {
  user: User;
  isLoggedIn: Boolean;
}

// Core User action
export type UserAction = { type: string; payload: User };

// Empty User action

export type EmptyUserAction = {
  type: string;
};

// Core Recipe type
export type Recipe = {
  id: number;
  sourceUrl: string;
  image: string | undefined;
  imageType: string | undefined;
  title: string;
  diets: never[] | string[];
  cuisines: string[];
  dishTypes: string[];
  vegetarian: Boolean;
  vegan: Boolean;
  glutenFree: Boolean;
  dairyFree: Boolean;
  veryHealthy: Boolean;
  cheap: Boolean;
  veryPopular: Boolean;
  sustainable: Boolean;
  aggregateLikes: number;
  spoonacularScore: number;
  healthScore: number;
  pricePerServing: number;
  readyInMinutes: number;
  servings: number;
};

// Core RecipeState interface
export interface RecipeState {
  recipe: Recipe;
}

// Core Recipe action
export type RecipeAction = { type: string; payload: Recipe };

// Core UserRecipe type
export type UserRecipe = {
  id: number;
  title: string;
  cuisine: string;
  dishType: string;
  vegetarian: Boolean;
  vegan: Boolean;
  glutenFree: Boolean;
  dairyFree: Boolean;
  readyInMinutes: number;
  servings: number;
  isSavored: Boolean;
};

// Core UserRecipeListState interface
export interface UserRecipeListState {
  userId: number;
  userRecipeList: UserRecipe[];
}

// Core UserRecipeList action
export type UserRecipeListAction = {
  type: string;
  payload: UserRecipe[] | UserRecipe;
};

// Core Filters type
export type Filters = {
  smartFilter: Boolean;
  dishType: string;
  cuisine: string;
  vegetarian: Boolean;
  vegan: Boolean;
  glutenFree: Boolean;
  dairyFree: Boolean;
  readyInMinutes: number;
  servings: number;
};

// Core FiltersState interface
export interface FiltersState {
  userId: number;
  filters: Filters;
}

// Core Filters action
export type FiltersAction = { type: string; payload: Filters };

/*
 _____________________________
 Components Property Objects
 _____________________________
*/

export type RecipeCardParamList = {
  id: number,
  rcp: Recipe,
  filteredDishtype: string
}

export type SwipeButtonsParamList = {
  handleOnPressLeft: () => void;
  handleOnPressRight: () => void;
};

export type RecipeCardStackParamList = {
  randRecipes: Recipe[],
  filtersState: FiltersState
}

/*
 _________________________
 Other Application Objects
 _________________________
*/

// InputUser for when users log in
export type InputUser = {
  username: string;
  password: string;
};
