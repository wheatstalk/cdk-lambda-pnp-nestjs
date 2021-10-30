import * as apigatewayv2 from '@aws-cdk/aws-apigatewayv2';
import * as apigatewayv2_integrations from '@aws-cdk/aws-apigatewayv2-integrations';
import * as cdk from '@aws-cdk/core';
import { YarnWorkspaceFunction } from '@wheatstalk/cdk-lambda-pnp';

class IntegCdkNest extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props: cdk.StackProps = {}) {
    super(scope, id, props);

    const handler = new YarnWorkspaceFunction(this, 'Handler', {
      workspace: 'api',
      handler: 'dist/lambda.handler',
    });

    const httpApi = new apigatewayv2.HttpApi(this, 'HttpApi', {
      defaultIntegration: new apigatewayv2_integrations.LambdaProxyIntegration({
        handler,
        payloadFormatVersion: apigatewayv2.PayloadFormatVersion.VERSION_1_0,
      }),
    });

    new cdk.CfnOutput(this, 'HttpApiUrl', {
      value: httpApi.url,
    });
  }
}

const app = new cdk.App();
new IntegCdkNest(app, 'integ-cdk-nest');
