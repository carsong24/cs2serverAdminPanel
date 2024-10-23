export const sendCommand = async (cmd: string, server: any) => {
    await fetch("/api/sendCmd", {
        method: "POST",
        body: JSON.stringify({ cmd: cmd, server: server?.server }),
      })
}