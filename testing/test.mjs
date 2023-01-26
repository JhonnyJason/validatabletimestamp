import { setTimeFrameMS, create, assertValidity } from "../output/index.js"


//==========================================================================
// Test Function
//==========================================================================
async function sloppyTest(timeFrame = 1000) {
    
    setTimeFrameMS(timeFrame)

    var stamp = create()

    // initial assertValidity Test
    try {
        assertValidity(stamp)    
    } catch(error) {
        throw new Error("Unexpected error on initial assertValidity: "+error.message)
    }

    await waitMS(timeFrame)

    // next assertValidity Test
    try {
        assertValidity(stamp)    
    } catch(error) {
        throw new Error("Unexpected error on next assertValidity: "+error.message)
    }

    await waitMS(timeFrame)

    // last assertValidity Test
    try {
        assertValidity(stamp)    
        throw new Error("Unexpectedly no error throw on last assertValidity!")
    } catch(error) { }

}


//==========================================================================
// run Tests Function
//==========================================================================
async function run() {

    try{
        await sloppyTest(500)
        console.log("success: sloppyTest 500")
    } catch(error) {
        console.log("! fail: sloppyTest 500\nerror> "+error.message+"\n\n")
    }
    
    try{
        await sloppyTest(1000)
        console.log("success: sloppyTest 1000")
    } catch(error) {
        console.log("! fail: sloppyTest 1000\nerror> "+error.message+"\n\n")
    }
 
    try{
        await sloppyTest(2000)
        console.log("success: sloppyTest 2000")
    } catch(error) {
        console.log("! fail: sloppyTest 2000\nerror> "+error.message+"\n\n")
    }

}

//==========================================================================
// helper functions
//==========================================================================
async function waitMS(ms) {
    await  new Promise((resolve) => setTimeout(resolve, ms))
}

run()