# What is it? 
Barnacle makes working with sails console easier

# Is it that hard?
Sails console is difficult to work with compared to something like rails console.  

Compare this:
```
User.find
```

To this:
```
User.find({}, function(err, users){console.log(users)})
```

One is significantly less typing (and errors in typing) (and accidentally hitting the down key and having to retype everything).

# Can I use it in production code?
NO.  Don't do that.  This doesn't actually flip the paradigm of the continuation passing/promise style of writing. It does not magically make Waterline synchronous or anything like that.  This is good for when you're on the console, and you want quick action, quick feedback, and less typing.

# Benefits
* Less typing
* Barnacle._ gets the result after the fact, so if you want to keep using your query result, you can do things like this:
    User.find_()  // retrieve all users from datastore
    Barnacle._[0] // Gets you the first user in the collection
* Full range (unless I missed some) of methods supported for CRUD operations (see full list in the "Methods Added" section)
* Execute limit, sort, where, and skip queries like this:
    User.find_({ where: { name: { '>=': 'a' } }, limit: 15, skip: 1, sort: 'name ASC' });

# Limitations
* Don't use this in production code.  
* You won't be able to use the results of queries for anything until it finishes the work.  That means that running multiple lines in console will also give you problems.
* You can't assign the results to variables as in "var users = User.find_();" (this is a specific 
* You can't use the query builder methods of .limit, .sort, .where, .skip in conjunction queries

# Example Usage

```
(from sails console)
Barnacle = require('Barnacle');
Barnacle.modelNames = ['AdminInvite', 'Comment', 'Project', 'Subscriber', 'User'];
Barnacle.defineMethods();
User.find_();
```

Now you can use dynamic and static methods without specifying callbacks.

# Methods Added

* find
* findOne
* create
* update
* destroy
* count
* findOneByAttributeName (ie. findOneByName)
* findOneByAttributeName
* findOneByAttributeNameLike
* findByAttributeName
* findByAttributeNameIn
* findByAttributeNameLike
* countByAttributeName
* countByAttributeNameIn
* countByAttributeNameLike
* attributeNameStartsWith
* attributeNameContains
* attributeNameEndsWith


Todo:
* Take arbitrary number of parameters  
* Factor out redefining method into its own package
* Create an exec_ function in order to support queries with where options 
