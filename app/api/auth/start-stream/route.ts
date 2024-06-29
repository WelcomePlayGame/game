// app/api/start-stream/route.ts
import { NextRequest, NextResponse } from 'next/server';
import AWS from 'aws-sdk';

const lambda = new AWS.Lambda({
  region: 'us-east-1', // Убедитесь, что регион указан правильно
});

export const POST = async (req: NextRequest): Promise<NextResponse> => {
  try {
    const { fbStreamKey, videoUrl } = await req.json();

    console.log('Received fbStreamKey:', fbStreamKey);
    console.log('Received videoUrl:', videoUrl);

    if (!fbStreamKey || !videoUrl) {
      throw new Error('Missing fbStreamKey or videoUrl');
    }

    const params = {
      FunctionName: 'arn:aws:lambda:us-east-1:637423196904:function:fb_stream',
      Payload: JSON.stringify({
        fb_stream_key: fbStreamKey,
        video_url: videoUrl,
      }),
    };

    console.log('Invoking Lambda with params:', params);

    const response = await lambda.invoke(params).promise();
    console.log('Lambda response:', response);

    const responsePayload = JSON.parse(response.Payload as string);

    if (response.FunctionError) {
      console.error('Lambda function error:', responsePayload);
      throw new Error(responsePayload.errorMessage);
    }

    return NextResponse.json({ message: responsePayload }, { status: 200 });
  } catch (error: any) {
    console.error('Failed to start stream:', error);
    return NextResponse.json(
      { message: 'Failed to start stream', error: error.message },
      { status: 500 }
    );
  }
};
