import axios from "axios";

// await axios("https://savored-server.herokuapp.com/", {
//   method: "POST",
//   data: {
//     query: `
//         mutation addRcp(
//             $user_id: String!,
//             $recipe_id: Int!,
//             $title: String!,
//             $is_savored: Boolean!,
//             $summary: String!,
//             ) {
//           addRecipe(
//             user_id:$user_id,
//             recipe_id:$recipe_id,
//             title:$title,
//             is_savored:$is_savored,
//             summary:$summary,
//             ) {
//            user_id
//            recipe_id
//            title
//            is_savored
//            summary
//           }
//         }
//         `,
//     variables: {
//       user_id: userUID.current,
//       recipe_id: recipeToBeAdded.id,
//       title: recipeToBeAdded.title,
//       is_savored: true,
//       summary: "delicious dude",
//     },
//   },
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// await axios("https://savored-server.herokuapp.com/", {
//   method: "POST",
//   data: {
//     query: `
//         mutation addRcp(
//             $user_id: String!,
//             $recipe_id: Int!,
//             $title: String!,
//             $is_savored: Boolean!,
//             $summary: String!,
//             ) {
//           addRecipe(
//             user_id:$user_id,
//             recipe_id:$recipe_id,
//             title:$title,
//             is_savored:$is_savored,
//             summary:$summary,
//             ) {
//            user_id
//            recipe_id
//            title
//            is_savored
//            summary
//           }
//         }
//         `,
//     variables: {
//       user_id: userUID.current,
//       recipe_id: recipeToBeAdded.id,
//       title: recipeToBeAdded.title,
//       is_savored: false,
//       summary: "delicious dude",
//     },
//   },
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

export async function createUser(
  id: string | undefined,
  username: string | null | undefined
) {
  console.log(id, username);
  const newUser = await axios("https://savored-server.herokuapp.com/", {
    method: "POST",
    data: {
      query: `
            mutation createUser($_id: String!, $username: String!) {
              createUser(_id:$_id, username:$username) {
               _id
                username
              }
            }
            `,
      variables: {
        _id: id,
        username: username,
      },
    },
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log(newUser);
}
