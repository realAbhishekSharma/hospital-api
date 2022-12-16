jest.setTimeout(100000);
jest.useFakeTimers()
const patCommand = require("../routers/patient_router/patient_command");


describe("testing for soming", () => {
    test("testname", () => {
        console.log("Running test");
        patCommand.VerifyToken(
            {
                header: (par)=>{
                    return undefined
                }
            },
            {
                send: (par) => {
                    expect(par).toEqual("token not found");
                    console.log("calling send");

                },
                status: (par) =>{
                    expect(par).toBe(403);
                  return {
                      json: (par) => {
                          console.log("hello");
                      }
                  }
                }
            },
            () => {
                console.log("calling send");

            }
        );
        expect(90).toEqual(90);
    })
})