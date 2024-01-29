curl -X POST -H "Content-Type: application/json" -d '{"deviceEUI": "001a79881701b63c", "data": "BAUBCAgAAQ=="}' http://localhost:3000/v1/decoder/obisObserver

curl -X POST -H "Content-Type: application/json" -d '{"deviceEUI": "001a79881701b63c", "commands": [{"id": 1, "requestId": 2}]}' http://localhost:3000/v1/encoder/obisObserver

curl -X POST -H "Content-Type: application/json" -d '{"deviceEUI": "001a79881701b63c", "framingFormat": "hdlc", "encodingFormat": "hex", "data": "7e0501007c297c667e"}' http://localhost:3000/v1/decoder/obisObserver

curl -X POST -H "Content-Type: application/json" -d '{"deviceEUI": "001a79881701b63c", "codec": "obisObserver", "data": "BAUBCAgAAQ=="}' http://localhost:3000/v1/decoder

curl -X POST -H "Content-Type: application/json" -d '{"deviceEUI": "001a79881701b63c", "data": "04050108080001", "encodingFormat": "hex"}' http://localhost:3000/v1/decoder/obisObserver


curl -X POST -H "Content-Type: application/json" -d '{"deviceEUI": "001a79881701b63c", "direction": "downlink", "data": "FQ4LsC1Ci8UAGnkWFiglMRQXAmQHBwAAC0wElfgAAAAAAAAAALABBgB3"}' http://localhost:3000/v1/decoder/analog

curl -X POST -H "Content-Type: application/json" -d '{"deviceEUI": "001a79881701b63c", "encodingFormat": "hex", "direction": "downlink", "data": "1f020048"}' http://localhost:3000/v1/decoder/analog

curl -X POST -H "Content-Type: application/json" -d '{"deviceEUI": "001a79881701b63c", "direction": "downlink", "data": "HwIASA=="}' http://localhost:3000/v1/decoder/analog

curl -X POST -H "Content-Type: application/json" -d '{"deviceEUI": "001a79881701b63c", "direction": "downlink", "data": "HgcCUwABAgME"}' http://localhost:3000/v1/decoder/mtxLora


curl -X POST -H "Content-Type: application/json" -d '{"deviceEUI": "001a79881701b63c", "direction": "uplink", "data": "HwICAAtB"}' http://localhost:3000/v1/decoder/analog


curl -X POST -H "Content-Type: application/json" -d '{"deviceEUI": "001a79881701b63c", "direction": "downlink", "data": "HgkjkSMQEAcAAADU"}' http://localhost:3000/v1/decoder/mtxLora

curl -X POST -H "Content-Type: application/json" -d '{"deviceEUI": "001a79881701b63c", "direction": "downlink", "data": "ARAQBwAAQg=="}' http://localhost:3000/v1/decoder/mtx

curl -X POST -H "Content-Type: application/json" -d '{"deviceEUI": "001a79881701b63c", "direction": "downlink", "encodingFormag": "hex", "data": "01101007000042"}' http://localhost:3000/v1/decoder/mtx

curl -X POST -H "Content-Type: application/json" -d '{"deviceEUI": "001a79881701b63c", "framingFormat": "hdlc", "encodingFormat": "hex", "aesKey": "000102030405060708090a0b0c0d0e0f", "data": "7e50fffffffe0c7d334704a6e5e63701ad37a5d57192143c52d91c7e"}' http://localhost:3000/v1/decoder/mtx

curl -X POST -H "Content-Type: application/json" -d '{"deviceEUI": "001a79881701b63c", "framingFormat": "hdlc", "encodingFormat": "hex", "frameParameters" {"type": "DATA_REQUEST", "source": 2, "destination": 3},  "commands": [{"id": 7}]}' http://localhost:3000/v1/encoder/mtx

curl -X POST -H "Content-Type: application/json" -d '{"deviceEUI": "001a79881701b63c", "framingFormat": "hdlc", "encodingFormat": "hex", "frameParameters" {"type": "DATA_REQUEST", "source": 2, "destination": 3},  "commands": [{"id": 7}]}' http://localhost:3000/v1/encoder/mtx


curl -X POST -H "Content-Type: application/json" -d '{"deviceEUI": "001a79881701b63c", "framingFormat": "hdlc", "encodingFormat": "hex", "direction": "downlink", "commands":[{"id":543}]}' http://localhost:3000/v1/encoder/analog

curl -X POST -H "Content-Type: application/json" -d '{"deviceEUI": "001a79881701b63c", "direction": "downlink", "encodingFormat": "hex", "commands": [{"id": 7}]}' http://localhost:3000/v1/encoder/mtxLora

1. 1e28c4314d1010796430280fff011d00000008001a00000008001d00000008011d00000008001a00000033
2. 1e28c43208001d00000008011d00000008001a00000008001d00000008011d00000008001a00000008009d
3. 1e21c4b31d00000008013a00000008013a00000008013a00000008013a00000008000063d0b9e5e7
