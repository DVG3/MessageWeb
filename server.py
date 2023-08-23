import json
from http.server import BaseHTTPRequestHandler, HTTPServer
MAX_MESSAGE_LENGTH = 20

allMessages = []


class Messaging(BaseHTTPRequestHandler):

    def do_GET(self):
        if self.path == '/get_messages':
          self.send_response(200, "Created")
          self.end_headers()
          dat = {"val":''.join(allMessages)}
          self.wfile.write((json.dumps(dat)).encode('utf-8'))
          return

        if self.path == '/':
           self.path = '/index.html'
        
        with open(self.path[1:], "r") as f:
            res = f.read()
        self.send_response(200)
      
        self.end_headers()
        
        self.wfile.write(res.encode('utf-8'))

    def do_POST(self):
        global allMessages
        content_length = int(self.headers['Content-Length']) # <--- Gets the size of data
        post_data = self.rfile.read(content_length) # <--- Gets the data itself
        #self._set_response()
        allMessages.append(json.loads(post_data.decode('utf-8'))['value'])
        if len(allMessages) > MAX_MESSAGE_LENGTH:
            allMessages = allMessages[len(allMessages) - MAX_MESSAGE_LENGTH + 1:]
        self.wfile.write("POST request for {}".format(self.path).encode('utf-8'))
    
        
port = HTTPServer(('', 80), Messaging)
  

port.serve_forever()