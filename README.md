Command to start the server: node app.js

# Endpoints
localhost:3000/signup -> POST =>Used to add user on the basis of role i.e. User and Admin.

localhost:3000/login -> POST =>Used to login in the system and then it will return token.

localhost:3000/createTopic -> POST =>Used to add a topic in DB (Only valid for Admin user).

localhost:3000/fetchTopics -> GET =>Used to fetch topics (valid for all users).

localhost:3000/fetchTopic/:topicId -> GET =>Used to fetch a single topic on the basis of topic id (valid for all users).

localhost:3000/createArticle -> POST =>Used to add an article in DB (Only valid for Admin user).

localhost:3000/updateArticle/:articleId -> PUT =>Used to update an article on the basis of article id.

localhost:3000/fetchArticleByTopicFeatured/:topicId -> GET =>Used to fetch featured articles on the basis of topic id.

localhost:3000/fetchArticleByTopicNonFeatured/:topicId -> GET =>Used to fetch non featured articles on the basis of topic id.

localhost:3000/fetchArticle/:articleId -> GET =>Used to fetch an article on the basis of article id.

localhost:3000/fetchArticleByTags/:articleId -> GET =>Used to fetch an article on the basis of tags.

localhost:3000/articleBinaryRepresentation -> GET =>Used to fetch binary representation of artilces.

localhost:3000/createTag -> POST =>Used to add a tag in DB.

# Configuration info
All the configuration files and place in config folder i.e mongoose connection, server information, and routes information.