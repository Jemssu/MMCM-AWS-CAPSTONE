const awsConfig = {
    aws_project_region: "ap-southeast-1",
    aws_appsync_graphqlEndpoint: "https://bdrldptzdfh4hpmu3lxtfgc3rm.appsync-api.ap-southeast-1.amazonaws.com/graphql",
    aws_appsync_region: "ap-southeast-1",
    aws_appsync_authenticationType: "API_KEY",
    aws_appsync_apiKey: "da2-xgfdc64x4fdlnolvnqorixbgcq",
    // Additional required parameters for v6 version
    aws_cognito_region: "ap-southeast-1",
    aws_user_pools_id: "", // Leave empty if not using Cognito
    aws_user_pools_web_client_id: "", // Leave empty if not using Cognito
};

export default awsConfig;