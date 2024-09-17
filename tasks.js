module.exports = (resources) => {
  const my = {}
  const shared = {
    // SHARED_VAR: value
    files : [],
    scanned_files: [],
    errored_files: []
    // ...
  }

  // ============================================================================

  my.run = async (input) => {
    const { bundled_config, _debug } = resources
    let output = {}

    try {
      const data = await setup(await validate( await load(input)))
      // business logic goes here...
      // output = ...
      output = data
    } catch (e) { 
      if(e.message=='MissingInput'){
        throw new Error('Input validation error: ' + e.message)
      }
      // if (e.message === ...
      //   throw new Error('...
      // }
      // Default case
      _debug(e.stack)
      throw (e)
    }

    return output

    async function load(input={}) {
      const config = {}
      // config.var1 = input.var1
      config.files = input.files 
      config.scanned_files = input.scanned_files || []
      config.errored_files = input.errored_files || []
      // ...
      // config.config1 = await bundled_config.config('CONFIG1')
      // ...
      return config
    }
    
    async function setup(config) {
      const data = {...config}
      // ...
      const scannedSet = new Set(data.scanned_files)
      const erroredSet = new Set(data.errored_files)
      
      return data.files.filter(file => 
        !scannedSet.has(file) && !erroredSet.has(file)
      )
    }
      
    }

    async function validate(config) {
      ;[
        // [variable, "display name"],
        [Array.isArray(config.scanned_files),"Scanned array must be an array"],
        [Array.isArray(config.errored_files),"Errored array must be an array"]
      ].forEach(([item, name]) => { if (!item) { throw new Error( 'MissingInput: ' + name )}})
      return config
    }
  }

  return my

