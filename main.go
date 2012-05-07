package main

import (
  "net/http"
  "code.google.com/p/go.net/websocket"
  "fmt"
  "log"
  "math/rand"
)

func SourceHandler(w http.ResponseWriter, r *http.Request) {
  http.ServeFile(w, r, r.URL.Path[1:])
}

func copyServer(ws *websocket.Conn) {

  for {
        
    // Receive message
    var in string
    websocket.Message.Receive(ws, &in)

    if in != "" {
      // Send message
      random := rand.Float64()
      websocket.Message.Send(ws, fmt.Sprintf("%f", random))
    }
  }
}

func main() {

	log.Println("Start server...")
	
	http.HandleFunc("/", SourceHandler) 
	http.Handle("/ws", websocket.Handler(copyServer))
	
  err := http.ListenAndServe(":4000", nil)
  
  if err != nil {
    panic("Error")
  }
}
