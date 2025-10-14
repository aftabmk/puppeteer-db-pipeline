const { main, browserManager } = require('./main');

const runLocal = async () => {
  console.log('🚀 Running workflow locally...');
  try {
    await main();
  } 
  catch (err) {
    console.error('❌ Local workflow failed:', err);
  } 
  finally {
    // optionally close browser when running locally
    if (browserManager) await browserManager.closeBrowser();
  }
};

const runLambda = async (event) => {
  console.log('⚙️ Lambda invoked with event:', JSON.stringify(event));
  try {
    await main();
    return {
      statusCode: 200
    };
  } 
  catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: err.message,
      }),
    };
  }
};

// Run locally if executed directly
if (require.main === module) {
  runLocal();
}

// Lambda exports
exports.handler = runLambda;
