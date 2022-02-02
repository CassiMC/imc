import { GoogleSpreadsheet } from 'google-spreadsheet';

export default function handler(req, res) {
    const SPREADSHEET_ID = '1VDaPP0z6eaHHbrwb5oEocV6NvoTxr-_2I18fpcWTwro';
    const CLIENT_EMAIL = "imc-316@imcproject-340108.iam.gserviceaccount.com";
    const PRIVATE_KEY = "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDPTaUsqOgKqhCh\nNIzdy3SdjeI5Kzjb/SOCT5v2iGBWgSnOl2x88uWS3kyo1LOXYBOEDYy73E18wwHU\nw6LcZKzowPb2bQ48iXJ8z1ZDMWmhovl4mAL98R2TE/pQuRcZAkuNoiuSIL0V01jk\nwGMq5FdgJEDloEjwH4mpNr0BAoF0Dtv0RaKIMGjE8GSy3w918lyzCRh3uZqYBcWR\nPsh+jLdGtblIpMlEV8yhCSF+QmFUOVCaHXSzktsSWbu+2XtjRaaY3cCUUlM5t/d6\nUTU00IOnn5MZpxJBIAAS7GXc4ZxFO6FEEolfqYcO9pldLU3ClAOkgmg9JEN4QCmG\n1z6b+2rTAgMBAAECggEAD8/b7qFR7nS0umpBtfrHNR7ilHqH5olTMT6Ic0ni30MQ\ndBUrGm5RTt4gRsU1wmQUcpjkYfSwMsX4PvxOt2gBo4QK0knUyvVI6dz+twO72BWQ\nP1lVt3zlEctCTb0joxRNVjF6bujxKaSdpF6wS1AJzufoM07O59HgAPiPetY84/DJ\nU/6HEmWwrScVHfFjfKJZOUCnuBeDxZyfNTSamN+C4qh393SxkJ1YAqaHTp0neh0y\njkbHm1qm95WdWhqnGTLs+1C/AsAWmVRhm5kN0T/tZ7oEZgfKjs9jt37LOT2P45R/\nwaNVe/bUycIMdv42gweYanWrLfRDcXX1Ox9trbAaQQKBgQD7p7VYXb9uo7ZLU9tl\no0gcliI5HnxztCEr0o5X+UCbgFDZ5nnujYDfSErh8BGVleUfQYWgnJSgmVy4XGzC\n/OvH5EbfAlksLVfrnsbnFYKWKC1w2Guh+ppjcy/vk1g5uSS9ElwXT6Y0fJC4MCw3\nFu8QehhM20dTg2VcSk8/ZvDQ0QKBgQDS4efzlxMkY1LZ//A7XfiNEx3DY684CjM4\nfcg7jZFRpEIeYOJOU1a4k+q+YWhOKt1I1Ac7Prh1+BvBDFjJ0dBN8lhIc2T6PJZi\nwXMVsPcZfyXM9APKuf+C1ED7rurQmFxJi+nTYaEUTvrv2eH6EkStvU63dKffDM/O\njbhcmiqKYwKBgQCI0rYWRWI/lWMXsZAnwo8Ce94/kAO6JMWkPeaGjk5CPZG350eE\nHAtlWrjb/tqQqd7ZD5bHrFpitv9ifV3k5f6Lv+GIfo5dJooW4Uzjdx545X9PS1u5\nxbcLOyVk7IebWr5Ozhyjz/pdrxxACHEBwsZX/woXP2GYVmhVtVFA94cXAQKBgFIZ\n5387oxU4oioDbdj/JeRuu9i1N6N+vSBSQCGHZTs+0wsWtyS9Z3bnB65lKAG+yHYx\nLjuPmKs9FDkdgHfaetnN7zcNzhNqgTYjkJWyVxGTIflgSxWjQmoCDuat2/eoSc3M\nbhWA3gCVGzdEQallcV2e5UWhYjYBu+nz3QIYd1V3AoGBAMBlRiA/D6cnVn77DQTc\n93GjzynW28wjO99OpSAXJsog1ldnUHJ65dqXJQOgDUfSxeAXLyKBN7uLJ+iqM6o6\nImMco1wKEX2FFXw6qX8lyRnOBoc81rFXdG53ryY/JO5GzHRzq/vGkfESPNQBBKUx\n3l0fv1PL24bdxjSMtpUh/x0K\n-----END PRIVATE KEY-----\n";
    const doc = new GoogleSpreadsheet(SPREADSHEET_ID);

    const appendSpreadsheet = async (row) => {
        try {
          await doc.useServiceAccountAuth({
            client_email: CLIENT_EMAIL,
            private_key: PRIVATE_KEY,
          });
          await doc.loadInfo();
          const sheet = doc.sheetsById["0"];
          const result = await sheet.addRow(row);
        } catch (e) {
          console.error('Error: ', e);
        }
    };

    const imc = (weight, height) => {
        return weight/(height*height)
    }

    const today = new Date();
    const result = imc(req.body.weight,req.body.height)
    const newRow = { Nom: req.body.name, Poids: req.body.weight, Taille: req.body.height, IMC: result, Naissance: req.body.birth, Calcul: today, };

    appendSpreadsheet(newRow);

    res.status(200).json({ imc: result })
  }