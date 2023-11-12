import Promise from 'bluebird'
import BaseStorage from 'ghost-storage-base'
import { ImgurClient } from 'imgur'

class ImgurStorage extends BaseStorage {
    constructor(config) {
        super()

        // Required config
        const clientId = process.env.GHOST_IMGUR_CLIENT_ID || config.clientId

        imgur = new ImgurClient({ clientId: process.env.CLIENT_ID });
    }

    delete(filename, targetDir) {
        return Promise.reject('not implemented');
    }

    exists(filename, targetDir) {
        return Promise.resolve(true) // Imgur will always generate a unique ID
    }

    read(options) {
        return Promise.reject('Not implemented')
    }

    save(file, targetDir) {
        return imgur.upload({
                  image: createReadStream(image.path),
                  type: 'stream',
            })
            .then(res => res.data.link)
    }

    serve() {
        // No need to serve because absolute URLs are returned
        return (req, res, next) => {
            next()
        }
    }
}

export default ImgurStorage
